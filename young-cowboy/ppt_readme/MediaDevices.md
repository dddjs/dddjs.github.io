title: MediaStream
speaker: 小牛仔
highlightStyle:monokai_sublime

[slide]
# MediaDevices

[slide]
## 捕获视频/音频

[slide]
长久以来，音频/视频捕获都是网络开发中的“圣杯”

（[Flash](http://www.kevinmusselman.com/2009/02/access-webcam-with-flash/) 或 [Silverlight](http://www.silverlightshow.net/items/Capturing-the-Webcam-in-Silverlight-4.aspx)）

[slide]
依靠 [WebRTC](http://dev.w3.org/2011/webrtc/editor/webrtc.html)（网络即时通信）的大力协助，寻找合适捕获 API 的步伐加快了很多。

[slide]
# WebRTC
网页实时通信（Web Real-Time Communication）谷歌2010年以6820万美元收购Global IP Solutions公司而获得的一项技术

[slide]
![](data:image/png;base64,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)

https://young-cowboy.github.io/gallery/mediadevices/

[slide]
```html
<style>
  #video{
    width: 320px;
    height: 180px;
    background-color: #000000;
  }
</style>

<video id="video" autoplay="autoplay" controls="controls"></video>

<script type="text/javascript">
  navigator
    .mediaDevices
    .getUserMedia({video: true, audio: true})
    .then(function(mediaStream) {
      var video = document.querySelector('video');

      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(error) {
      console.log(error);
    });
</script>
```

[slide]
## MediaDevices.getUserMedia()

[slide]
允许使用一个视频和/或一个音频输入设备

[slide]
# 安全限制
## HTTPS协议 or file协议

[slide]
# 支持的约束条件
getSupportedConstraints

[slide]
```javascript
navigator
  .mediaDevices
  .getSupportedConstraints()
```

constraints 参数是一个包含了video 和 audio两个成员的
MediaStreamConstraints 对象，用于说明请求的媒体类型。

[slide]
```json
{
  "aspectRatio": true, //采集比例
  "channelCount": true,
  "deviceId": true,
  "echoCancellation": true,
  "facingMode": true,
  "frameRate": true,
  "groupId": true,
  "height": true,
  "latency": true, //延迟
  "sampleRate": true,
  "sampleSize": true,
  "volume": true,
  "width": true
  ......
```

[slide]
# 收集系统上可用的多媒体输入和输出设备的信息
## enumerateDevices

[slide]
```javascript
navigator
  .mediaDevices
  .enumerateDevices()
  .then(res => console.log(res))
```

[slide]
```json
[
  {
    "deviceId": "default",
    "kind": "audioinput",
    "label": "Default",
    "groupId": "50ec3ed5a0cff9ab1c4c5ee9aa81db10c37162fca33c03dc9b5a191dedb2e8e4"
  },
  {
    "deviceId": "e38a9b92758f008e71510a95aa36957553e2a5ce7febc6e4bcd57798807c1519",
    "kind": "audioinput",
    "label": "Built-in Microphone",
    "groupId": "50ec3ed5a0cff9ab1c4c5ee9aa81db10c37162fca33c03dc9b5a191dedb2e8e4"
  },
  {
    "deviceId": "5013c01eb0a704c09d15aa668601f8dfb80f1a33d179b2adcbb64a8fbad5fc62",
    "kind": "videoinput",
    "label": "FaceTime HD Camera",
    "groupId": ""
  },
  {
    "deviceId": "default",
    "kind": "audiooutput",
    "label": "Default",
    "groupId": "50ec3ed5a0cff9ab1c4c5ee9aa81db10c37162fca33c03dc9b5a191dedb2e8e4"
  },
  {
    "deviceId": "ba0bb7502f314e3ad61511aa6468c6a48ec679e34e5ebd975852db1d8d3ab3e7",
    "kind": "audiooutput",
    "label": "Built-in Output",
    "groupId": "50ec3ed5a0cff9ab1c4c5ee9aa81db10c37162fca33c03dc9b5a191dedb2e8e4"
  }
]
```

[slide]

## 参考资料

- [Capturing Audio & Video in HTML5](https://www.html5rocks.com/zh/tutorials/getusermedia/intro/)
- [getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
- [enumerateDevices](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/enumerateDevices)
- [getSupportedConstraints](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getSupportedConstraints)
- [MediaTrackSupportedConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints)
- [Capabilities, constraints, and settings](https://developer.mozilla.org/en-US/docs/Web/API/Media_Streams_API/Constraints#Example_Constraint_exerciser)