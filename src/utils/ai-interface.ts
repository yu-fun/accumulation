import { fetchEventSource } from '@microsoft/fetch-event-source';

const controller = new AbortController();
const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-XSRF-TOKEN': 'csrfToken',
  'X-Platform': 'web',
};

type Opts = {
  headers?: { [key: string]: unknown };
  [p: string]: unknown;
};

class AiInterface {
  headers: { [key: string]: unknown };
  messageList: Record<string, unknown>[] = [];
  conversitionId: string = '';
  taskId: string = '';
  messageId: string = '';
  sending: boolean = false;
  constructor(opts?: Opts) {
    this.headers = opts?.headers || {};
    // this.messageList = [];
    // this.conversitionId = '';
    // this.taskId = '';
    // this.messageId = '';
    // this.sending = false
  }
  onOpen() {}
  onMessage(data: string) {
    try {
      const res = JSON.parse(data);
      switch (res.event) {
        case 'message': {
          const item = this.messageList.find(
            (i) => i.message_id == res.message_id
          );
          if (item) {
            item.answer += res.answer;
          } else {
            this.conversitionId = res.conversition_id;
            this.taskId = res.task_id;
            this.messageId = res.message_id;
            this.messageList.push(res);
          }
          break;
        }
        case 'message_end': {
          this.sending = false;
          console.log('message_end');
          break;
        }
        default:
      }
    } catch (error) {
      console.log(error);
    }
  }
  onClose() {}
  onError() {}
  sseColse() {
    controller.abort();
    this.sending = false;
  }
  send(params: Record<string, unknown>) {
    this.sending = true;
    fetchEventSource('', {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...this.headers,
      },
      body: JSON.stringify(params),
      openWhenHidden: true,
      signal: controller.signal,
      credentials: 'include',
      onopen: async () => {
        this.sending = true;
        this.onOpen();
      },
      onmessage: ({ data }: { data: string }) => {
        this.onMessage(data);
      },
      onclose: () => {
        this.sending = false;
        this.onClose();
      },
      onerror: (err: unknown) => {
        this.sending = false;
        this.onError();
        throw err;
      },
    });
  }
  stopSend() {}
  resend() {}
  dislikeAnswer() {}
}

export default AiInterface;
