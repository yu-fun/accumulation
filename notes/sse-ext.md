# SSE

### 存在问题
在业务真实使用场景中，基于 SSE 的方法存在一些问题和限制：

默认请求仅支持GET方法。当前端需要向后端传递参数时，参数只能拼接在请求的 URL 上，对于复杂的业务场景来说实现较为麻烦。

对于服务端返回的数据格式有固定要求，必须按照event、id、retry、data的结构返回。

服务端发送的数据可以在浏览器控制台中查看，这可能会暴露敏感数据，导致数据安全问题。

为了解决以上问题，并使其支持POST请求以及自定义的返回数据格式，我们可以使用以下技巧

```js
import { fetchEventSource } from '@microsoft/fetch-event-source';
```

### 利用 Fetch API 的流处理能力，可以实现对 SSE 的扩展

```js
/**
 * Utf8ArrayToStr: 将Uint8Array的数据转为字符串
 * @param {Uint8Array} array - Uint8Array数据
 * @return {string} - 转换后的字符串
 */
function Utf8ArrayToStr(array) {
  const decoder = new TextDecoder();
  return decoder.decode(array);
}

/**
 * fetchStream: 建立一个SSE连接，并支持多种HTTP请求方式
 * @param {string} url - 请求的URL地址
 * @param {object} params - 请求的参数，包括HTTP方法、头部、主体内容等
 * @return {Promise} - 返回一个Promise对象
 */
const fetchStream = (url, params) => {
  const { onmessage, onclose, ...otherParams } = params;

  return fetch(url, otherParams)
    .then((response) => {
      let reader = response.body?.getReader();

      return new ReadableStream({
        start(controller) {
          function push() {
            reader?.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                onclose?.();
                return;
              }
              const decodedData = Utf8ArrayToStr(value);
              console.log(decodedData);

              onmessage?.(decodedData);

              controller.enqueue(value);

              push();
            });
          }
          push();
        },
      });
    })
    .then((stream) => {
      return new Response(stream, {
        headers: { 'Content-Type': 'text/html' },
      }).text();
    });
};

// 示例：调用fetchStream函数
fetchStream('/events', {
  method: 'POST', // 使用POST方法
  headers: {
    'content-type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    // 这里列出了一些示例数据，实际业务场景请替换为你的数据
    boxId: 'exampleBoxId',
    sessionId: 'exampleSessionId',
    queryContent: 'exampleQueryContent',
  }),
  onmessage: (res) => {
    console.log(res); // 当接收到消息时的回调
  },
  onclose: () => {
    console.log('Connection closed.'); // 当连接关闭时的回调
  },
});
```
