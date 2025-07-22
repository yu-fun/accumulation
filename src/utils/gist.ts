// 录制一段音频，并在完成后播放
export const getLocalStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    console.log('麦克风权限已授予！');

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      // 每当有数据可用时，将录制的片段添加到chunks数组中
      chunks.push(event.data);
    };

    recorder.onstop = () => {
      console.log('录制完成！');
      const completeBlob = new Blob(chunks, { type: recorder.mimeType });
      const url = URL.createObjectURL(completeBlob);
      const music = new Audio(url);

      music.onended = music.onerror = () => {
        console.log('播放完成！');
        URL.revokeObjectURL(url);
      };

      console.log('开始播放！');
      music.play();
    };

    console.log('开始录制！');
    recorder.start();

    setTimeout(() => {
      recorder.stop();
    }, 2000);
  } catch (error) {
    console.error(`麦克风权限获取失败：${error}`);
  }
};
