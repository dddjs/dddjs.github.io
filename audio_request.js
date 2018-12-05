var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx;
var source;
try {
  audioCtx = new AudioContext();
  console.log('support');
  console.log(audioCtx)

} catch (e) {
  alert('Your browser does not support AudioContext!');
  console.log(e);
}

// use XHR to load an audio track, and
// decodeAudioData to decode it and stick it in a buffer.
// Then we put the buffer into the source

var getData = function () {
  // create audio node to play the audio in the buffer
  source = audioCtx.createBufferSource();
  console.log(source)

  // 请求
  var request = new XMLHttpRequest();

  //初始化 HTTP 请求参数, 配置请求类型，文件路径等
  request.open('GET', 'audio/music.mp3', true);

  // 配置数据返回类型,从服务器取回二进制数据
  request.responseType = 'arraybuffer';

  // 获取完成，对音频进一步操作，解码
  request.onload = function () {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function (buffer) {
        source.buffer = buffer;

        source.connect(audioCtx.destination);
        source.loop = true;
      },
      function (e) {
        console.log("Error with decoding audio data" + e.err);
      });
  };

  // 发送一个 HTTP 请求
  request.send();
};

// play audio
getData();
// 从最开始播放
source.start(0);