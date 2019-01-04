title: 浅谈WebRTC
speaker: 小牛仔
highlightStyle:monokai_sublime

[slide]
# 浅谈WebRTC
## Web Real-Time Communication

[slide]
# 什么是WebRTC

Web Real-Time Communication(Web 实时通信，WebRTC)由一组标准、协议和 JavaScript API 组成，用于实现浏览器之间(端到端)的音频、视频及数据共享

[slide]
# 标准的制定

* W3C 的 Web Real-Time Communications(WEBRTC)Working Group 负责制定浏 览器 API; 
* IETF 的 Real-Time Communication in Web-browsers(RTCWEB)工作组负责定 义协议、数据格式、安全及其他在浏览器中实现端到端通信必需的内容

[slide]
* getUserMedia
* PeerConnection
* DataChannels

[slide]
# getUserMedia
## 移步之前的[PPT](https://young-cowboy.github.io/ppt/MediaDevices.html)

[slide]
# ICE 穿越
要想成功地建立端到端的连接，必须首先解决另外几个问题: 
* 必须通知另一端我们想打开一个端到端的连接，以便它知道开始监听到来的分组;
* 必须找出两端之间建立连接所需的路由线路，并在两端传播这个信息;
* 必须交换有关媒介和数据流的必要信息，比如协议、编码，等等。 

[slide]
# RTCPeerConnection

* RTCPeerConnection 管理穿越 NA T 的完整 ICE 工作流;
* RTCPeerConnection 发送自动(STUN)持久化信号;
* RTCPeerConnection 跟踪本地流;
* RTCPeerConnection 跟踪远程流;
* RTCPeerConnection 按需触发自动流协商; 

[slide]
# 信令的3种类型信息

* Session control messages: 初始化和关闭通信，及报告错误；
* Network configuration: 双方的IP地址和端口号（局域网内部IP地址需转换为外部的IP地址）；
* Media capabilities: 双方的浏览器支持使用何种codecs以及多高的视频分辨率。

[slide]
# 一个小结
* Peer: 通过 WebRTC 进行数据交互的节点或用户或终端，它通常是一个 Web App，它们之间的发现，连接的建立和断开通过 signalling（信令）控制。
* PeerConnection: 表示一个 WebRTC 通讯连接对象，它维护与这个通讯连接相关的 MediaStream，处理通讯双方信令事件，完成通讯数据的传输。
* Signalling: 信令，WebRTC 网络通过 Signalling 来发现各个 Peer，通过 Signalling 来控制各个 Peer 之间连接的建立和断开。

[slide]
# 一个小结

* STUN: STUN（Session Traversal Utilities for NAT，NAT会话传输应用程序）是一种网络协议，它允许位于NAT（或多重NAT）后的客户端找出自己的公网地址，查出自己位于哪种类型的NAT之后以及NAT为某一个本地端口所绑定的Internet端端口。这些信息被用来在两个同时处于NAT 路由器之后的主机之间建立UDP通信。该协议由RFC 5389定义。
* TURN: TURN（Traversal Using Relay NAT），是一种资料传输协议（data-transfer protocol）。通过中继服务器，穿透 NAT 或防火墙使两个 TCP 或 UPD 客户端建立连接。
* ICE: 
  * 交互式连接建立（Interactive Connectivity Establishment），一种综合性的NAT穿越的技术。
  * ICE 是由IETF的MMUSIC工作组开发出来的一种framework，可整合各种NAT穿透技术，如STUN、TURN、RSIP（Realm Specific IP，特定域IP）等。该framework可以让SIP的客户端利用各种NAT穿透方式打穿远程的防火墙。

[slide]
# 计算机网络
![](https://gw.alicdn.com/tfs/TB18VzucOqAXuNjy1XdXXaYcVXa-1180-570.png)

[slide]
# 流程

* 呼叫方发送 offer
* 被呼叫方接受这个 offer
* 被呼叫方发送 answer
* 呼叫方接受 answer

[slide]
# 创建信令
```javscript
var pc = new PeerConnection();

pc.addStream(video);
pc.createOffer(function(desc){
  pc.setLocalDescription(desc, function() {
    // send the offer to a server that can negotiate with a remote client
  });
};
```

[slide]
# 创建回复
```javscript
var pc = new PeerConnection();

pc.setRemoteDescription(new RTCSessionDescription(offer), function() {
  pc.createAnswer(function(answer) {
    pc.setLocalDescription(answer, function() {
      // send the answer to the remote connection
  })
});
```

[slide]
# let's rock!

