# dddjs.github.io

- 音频保存
- 音频发送
- 音频加载
- 音频波形
- 视频隐藏
- 音频隐藏
- audio to base64
- [base64 to audio](http://ask.dcloud.net.cn/article/841)


[克服 iOS HTML5 音频的局限](https://www.cnblogs.com/jidan/p/5088280.html)
尽管 HTML5 音频表现出色，但作为一个仍在开发的规范，它仍有很多局限。移动版 Safari 甚至引入了更多的限制。在本文中，您将了解 HTML5 在移动版 Safari 方面的局限性。一些工作示例提供了相应的解决方案和全面的变通方法。通过本文您将了解在移动版 Safari 中使用 audio sprite 的好处，并尝试使用几个独到的解决方案来绕过 iOS 中的 HTML5 局限。

目录[-]

常用的缩略语
HTML5 音频的局限性
格式支持
表 1. HTML5 视频格式支持
清单 1. 音频元素的 HTML 标记
处理和效果
单音频层（多音的）
iOS、移动版 Safari 和 HTML5 音频的限制
单音频流
清单 2. 单音频流
清单 3. 可互换的音频视频流
自动播放
加载音频
图 1. 在移动版 Safari 中加载音频的工作流
清单 4. 在页面加载时播放音频流在默认情况下会失败
清单 5. 移动版 Safari 中不支持 preload 属性
其他的怪癖
清单 6. 在切换音频对象时的 HTML5 音频延时
清单 7. 在一个尚未载入其元数据的音频流上设置 currentTime
清单 8. iOS < 5 的音频循环变通方案
解决方案
单个音频流
清单 9. 置换一个音频对象的源文件
自动播放
清单 10. iOS 4.2.1 之前，可以在一个 Ajax 调用的回调中加载一个音频流
加载音频
清单 11. 使用一个事件触发事件来加载一个音频流
图 2. 割绳子游戏的 HTML5 启动屏幕
不受支持的事件
表 2. 桌面和移动版 Safari 对媒体事件的支持
清单 12. 设置 currentTime 将会触发 seeking 和 seeked 事件
Audio sprite
图 3. Audio sprite
清单 13. 简单的 audio sprite 实现
清单 14. 添加当到达 sprite 的结尾时停止流的逻辑
功能全面的示例
directCanvas 和 multiSound 如何加速 HTML5 游戏性能
图 4. 使用 directCanvas 获得的从移动版 Safari 到 MobiUs 应用程序的平均 HTML5 性能改进
结束语
简介

过去几年，开发人员一直都在制造完善的交互体验，努力使其可以在浏览器中正确运行。这样的站点通常需要使用浏览器插件 (Flash)。随着智能手机和平板电脑的推出，交互体验看似与新的小部件能够完美匹配。但是，由于移动设备的处理能力有限，浏览器插件不再是一种可行的开发平台。

常用的缩略语
AAC：高级音频编码 (Advanced Audio Coding)

CSS：级联样式表 (Cascading Style Sheet)

HTML：超文本标记语言 (HyperText Markup Language)

MP3：MPEG-1 Audio Layer 3

OGG：一种开放容器格式 (open container format)

WAV：波形音频格式 (Waveform Audio Format)

HTML5 已经添加了大量无需额外插件的使用的工具。W3C 的 HTML5 规范仍在开发之中，但是在规范开发过程中，浏览器已经开始提供支持。

HTML5 音频是一个巨大的进步，它允许在浏览器中嵌入声音，尤其是在移动设备中，比如 iOS 的移动版 Safari 浏览器上。尽管 HTML5 音频是一个新特性，但已提供了 iOS 支持。根据流行的移动应用程序 Instapaper 的开发人员报导，2011 年 11 月，其 iOS 用户中有 98.8% 都在使用 iOS 4 或更高版本（请参阅 参考资料）。由于 HTML5 音频是在 iOS 3 中引入到移动版 Safari 中的，所以您可以放心，iOS 平台为 HTML5 音频提供了广泛的支持。

在文本中，您将了解 HTML5 在桌面上和移动版 Safari 内的局限性，并尝试采用一些解决方案来创建交互的声音效果。本文涵盖的其他内容包括：不受支持的事件、audio sprite 以及如何使用 directCanvas 和 multiSound 加速 HTML5 游戏性能。

有一点非常值得关注：对于 iOS 6，Apple 已经添加了对 Web Audio API（讨论如下）的支持，因此不再需要使用本文中所讨论的许多变通方法。不过，iOS 6 刚刚面世不到几周时间，所以 iOS 5 仍然是市场的主流。本文中所讨论的问题以及所提供的变通方式仍有效，应该在为移动版 Safari 开发声频时考虑使用它们。

您可以 下载 本文中使用的示例的源代码。

回页首

HTML5 音频的局限性
在讨论移动版 Safari 中的局限性之前，有必要理解 HTML 音频在桌面上的局限性。HTML5 音频虽然很健壮，但有其局限性，这主要取决于它的实现。对于音乐播放器（点唱机播放器）或简单的声音效果，它很有效，但是对于声音密集的应用程序如游戏，它的表现不是很理想。

格式支持
不幸的是，并不是所有浏览器都支持相同的视频文件格式。如表 1 所示，目前有四种主要格式：MP3、OGG、WAV 和 AAC。

表 1. HTML5 视频格式支持
 	Ogg Vorbis	WAV	PCM	AAC
Internet Explorer 9	 	 	X	X
Firefox	X	X	 	 
Chrome/Safari/移动版 Safari	 	X	X	X
为了涵盖所有浏览器，最好是让所有的视频流都具有 Ogg Vorbis 和 AAC 两种格式。

为什么没有包括 MP3？MP3 在进行商业传播时需要支付繁重的版税。MP3 的授权要求对于所有超过 $100K 的数据收取 2% 的传播费（请参阅参考资料）。出于这个原因，我更倾向于使用 AAC 而非 MP3。AAC 也并非完全免版税的，但它对于免费传播的许可没有那么严格。AAC 还提供了更好的压缩，文件可以更小，它是 Web 领域的福音（请参阅 参考资料）。

Ogg Vorbis 之所以压倒性地获得了我的喜爱是因为它是开源的、无专利费并且免版税的。不过，只有 Firefox 支持它。

清单 1 显示了跨浏览器兼容 HTML 标记。

清单 1. 音频元素的 HTML 标记
<audio>
    // AAC file (Chrome/Safari/IE9)
    <source src="sound.m4a" type="audio/mpeg" />
    // Ogg Vorbis (Firefox)
    <source src="sound.ogg" type="audio/ogg" />
</audio>
 

处理和效果
在处理音频时，一个强大的特性是处理声音的能力。无论动态合成声音、处理声音效果、应用环境效果，还是进行基本的立体声平移，HTML5 音频缺乏所有这些处理能力。您加载的视频就是将要播放的视频。

Web Audio API (Chrome) 和 Audio Data API (Firefox) 无需任何浏览器插件即可进行合成和动态处理音频的能力帮助您解决了特性缺失的问题（请参阅 参考资料）。这两种 API 均在开发当中，仅在 Chrome 14+ 和 Firefox 4+ 中受支持。不幸的是，在实现方面这二者差异很大。目前有一些表现不错的库可用来使支持正规化，比如 audiolibjs（请参阅 参考资料）。Chrome 的 Web Audio API 就是通过 W3C 推广的标准。

单音频层（多音的）
要重复播放声音本身，必须实例化此声音的一个单独的音频对象。在标记和能够播放的音频之间存在 1:1 的对应。对于当前状态的 HTML5 音频，是无法分层的。其他平台，比如 Flash，可以分出一个单独的音频对象，无需创建一个新的音频对象。

回页首

iOS、移动版 Safari 和 HTML5 音频的限制
HTML5 音频本身多少存在一些限制，而移动版 Safari 则向 HTML5 音频最基本的使用添加了其他的限制。

单音频流
移动版 Safari 带来的最大的局限之一是一次只能播放一个单音频流。移动版 Safari 中的 HTML5 媒体元素都是单例的，所以一次只能播放一个 HTML5 音频（和 HTML5 视频）流。Apple 为这一局限做过解释，但我们推断这是为了减少数据费用（这也是大多数 iOS HTML5 其他局限的原因所在）。

iOS 为移动版 Safari 提供了单一 HTML5 媒体（音频和视频）容器。如果想要在播放一个音频流的同时播放另一个音频流，那么就会从容器中删除前一个音频流，新的音频流将会在前一个音频流的位置上被实例化。

清单 2 显示了在一个流播放的同时调用 play() 如何会停止之前的流，在本例中该流为 audio1。

清单 2. 单音频流
var audio1 = document.getElementById('audio1');
var audio2 = document.getElementById('audio2');
audio1.play(); // this stream will immediately stop when the next line is run
audio2.play(); // this will stop audio1
 

查看并收听 本例的效果。

有一点很重要，务必牢记，音频和视频是可以互换的。如果在视频播放的同时要播放音频文件，那么视频就会停止。一次只能播放一个音频或视频流，如清单 3 所示。

清单 3. 可互换的音频视频流
var audio = document.getElementById('audio');
var video = document.getElementById('video');
video.play();

// at a later time
audio.play(); // this will stop video
 

自动播放
在移动版 Safari 中加载的页面上，不能自动播放音频文件。音频文件只能从用户触发的触摸（单击）事件加载。如果在 HTML 标记中使用了autoplay 属性，那么移动版 Safari 将会忽略这个属性，并且不会在加载页面时播放此文件，如下所示：

<audio id="audio" src="audio_file.mp3" autoplay></audio>
 

Safari Developer Guide 上有有关于此的详细信息（请参阅 参考资料）。

加载音频
除非由用户接触事件，比如通过 onmousedown、onmouseup、onclick 或 ontouchstart 触发事件，否则不能加载音频流。图 1 显示了这样的一个示例。

图 1. 在移动版 Safari 中加载音频的工作流
在 mobile Safari 中加载音频的工作流

如果在加载页面时运行清单 4 中的代码，那么在移动版 Safari 中不会加载视频流，甚至不会下载该视频流。

清单 4. 在页面加载时播放音频流在默认情况下会失败
var audio = document.getElementById('audio');
audio.play();
 

即便是 HTML markup 中使用了 preload 属性，移动版 Safari 仍会忽视此属性，并且不会加载此文件，除非由用户触摸事件，如清单 5 所示。

清单 5. 移动版 Safari 中不支持 preload 属性
<audio id="audio" src="audio_file.mp3" 
preload="auto"></audio>
 

查看并收听 本例的效果。

在桌面 Safari 上，在加载页面时，清单 5 中的代码会下载此音频文件。但是，在移动版 Safari 上，此属性会被忽视，并且不会下载此音频文件。

其他的怪癖
在移动版 Safari 中使用 HTML5 音频还有其他几个怪癖需要考虑。

在初始化一个新的音频流时会有几秒的延时，这是因为 iOS 需要实例化一个新的音频对象。清单 6 显示了如何遭遇这种延时。

清单 6. 在切换音频对象时的 HTML5 音频延时
var audio1 = document.getElementById('audio1');
var audio2 = document.getElementById('audio2');
audio1.play();

// at a later time
audio2.play(); 
// there will be a few-seconds delay as iOS is instantiating a new audio object. 

// at an even later time
audio1.play(); // there will also be a few-seconds delay, as the audio object 
// for audio1 in iOS was destroyed when we played audio2.
 

查看并收听 本例的效果。

重要的是确保您的逻辑不会假设音频流是在加载页面时载入的。调用 play() 在默认情况下会失败，如果在将要加载但尚未载入其元数据的音频流上尝试设置 currentTime，则会抛出一个致命错误，如清单 7 所示。

清单 7. 在一个尚未载入其元数据的音频流上设置 currentTime
// run on page load
var audio = document.getElementById('audio');
audio.play(); // This will silently fail
audio.currentTime = 2; // This will throw a fatal error because the metadata 
// for the audio does not exist
 

查看并收听 本例的效果。

音频文件不能缓存在 iOS 上的移动版 manifest 中。只有在对某个离线应用程序使用清单 (manifest) 时，这才适用。如果一个音频文件包含在此清单中，iOS 将会忽略它，并且不会缓存此文件。每当此 Web 应用程序需要访问此音频文件时，都需要从该网络访问此文件。

用 JavaScript 以编程方式进行相关设置时，移动版 Safari 并不会尊重此音量和 playbackRate 属性。更改属性也不会实际调整这些值。音量总是在用户控制下，并且 playbackRate 在移动版 Safari 中仍然不受支持。音量总是保持设置为 1，playbackRate 则会设置为希望设置的新值，但是音频流回放的实际速度不会发生改变。这会为 onratechange 事件带来某些复杂性，我们将在 不受支持的事件 部分对此进行讨论。

在 iOS 5 之前，循环属性是不受支持的。为了解决缺乏支持的问题，可以向 onended 事件添加了一个事件侦听程序，并在该函数中调用play()。清单 8 显示了一个例子。

清单 8. iOS < 5 的音频循环变通方案
var audio = document.getElementById('audio');
audio.play();

var onEnded = function() {
    this.play();
};

audio.addEventListener('ended', onEnded, false);
 

查看并收听 本例的效果。

回页首

解决方案
用来解决移动版 Safari 中 HTML5 音频的缺陷的解决方案完全取决于具体用法。如果您只想播放一个单一音频文件或音频文件的播放列表，那么无需做太多更改。但是，如果需要获得交互的声音效果，那么事情就有些棘手了。

单个音频流
单个音频流局限的一种解决方案是用所需音频置换出源文件，如清单 9 所示。这不是一种理想的解决方案，因为您需要等待加载新的音频流后才能播放它。

清单 9. 置换一个音频对象的源文件
var audio = document.getElementById('audio');
audio.play();

// at some later point in your script (does not need to be from a touch event)
audio.src = 'newfile.m4a';
audio.play(); // there will be a slight delay while the new audio file loads
 

查看并收听 本例的效果。

应对单个音频流局限性的一种更好的解决方案是使用 audio sprite。简言之，您要将所有的音频综合到一个单音频流中，然后播放此流的各个部分。Audio sprite 部分提供了更详细的信息。

自动播放
对于自动播放的局限性，没有变通方案。正如前面所提及的，音频流只能从用户触摸事件加载。当针对移动版 Safari 进行开发时，重要的一点是要在必要时调整您的工作流，以适应这个局限性。（以我的经验来看，我知道如果在一开始没有将这些考虑在内，那么将来会发生很多重构。）

在 iOS 4.2.1 之前，可以从一个同步 Ajax 调用的回调来加载音频文件，如清单 10 内的示例所示。

清单 10. iOS 4.2.1 之前，可以在一个 Ajax 调用的回调中加载一个音频流
// run on page load
var audio = document.getElementById('audio');

jQuery.ajax({
    url: 'ajax.js',
    async: false,
    success: function() {
        audio.play(); // audio will play in iOS before 4.2.1
    }
});
 

收听 这个例子的效果。

清单 10 中的方法存在一个问题：因它是一个同步 Ajax 调用，所以浏览器是锁定的，直到调用结束为止。在移动版 Safari 中，锁定并不只是意味着页面锁定，整个应用程序都会锁定。如果有错误发生，并且移动版 Safari 陷入锁定状态（可能性不是很大），那么退出浏览器的惟一方式是单击 home 按钮并强制关闭应用程序。

Apple 在 iOS 4.2.1 中修复了这种变通方式，所以这种变通方法在 iOS 4.2.1 和后续版本中是不起作用的。

加载音频
音频流只在用户事件触发时才能加载。如清单 11 所示，onmousedown、onmouseup、onclick 和 ontouchstart 都是一些可用的事件，当在一个回调中调用它们时，可成功加载一个音频流。请注意，这种情况只适用于加载一个音频文件时，在一个已经加载的文件上调用 play() 会按预期的那样工作。

清单 11. 使用一个事件触发事件来加载一个音频流
// run on page load
var button = document.getElementById('button');
var audio = document.getElementById('audio');

var onClick = function() {
    audio.play(); // audio will load and then play
};

button.addEventListener('click', onClick, false);
 

查看并收听 本例的效果。

乍一看，清单 11 更像是一个烦人的变通方案。但是，最好是为您的游戏或交互式体验提供一个启动屏幕，如图 2 所示，要求用户单击一个按钮来启动。当用户单击 start 按钮时，您可以使用该事件在您的项目中加载音频。

图 2. 割绳子游戏的 HTML5 启动屏幕
割绳子游戏的 HTML5 启动屏幕

回页首

不受支持的事件
虽然移动版 Safari 中的 HTML5 音频支持来自桌面的所有媒体事件，但要注意的是，由于之前提到的几个不受支持的属性，某些事件永远都不会触发。还有几个怪癖需要注意。

表 2 列出了此音频元素的所有事件回调及其在桌面和移动版 Safari 上的兼容性。结果是以作者设置的 HTML5 音频 事件调试程序 为基础的，如果您愿意，尽可以去尝试。

表 2. 桌面和移动版 Safari 对媒体事件的支持
事件	描述	桌面	移动版 Safari
abort	在媒体完全下载之前，浏览器停止获取媒体。	X	X
canplay	浏览器可恢复媒体数据的回放，但会做出评估：如果回放开启，在不会停下来做进一步的内容缓冲的情况下，媒体资源在结束操作前不会以目前的回放速度呈现。	X	X
canplaythrough	浏览器会做出评估：如果回放现在开始，那么在不停下来做进一步缓冲的情况下，媒体资源会以目前的回放速度呈现，一直到结束。	X	X
durationchange	duration 属性发生变化。	X	X
emptied	媒体元素网络状态更改成 NETWORK_EMPTY 状态。	X	X
ended	回放在媒体资源的终点停止，且 ended 属性被设置为 true。	X	X
error	在获取媒体数据前会发生错误。使用此 error 属性来获得当前的错误。	X	X
loadeddata	浏览器可以初次在目前的回放位置呈现媒体数据。	X	X
loadedmetadata	浏览器知道媒体资源的持续时间和大小。	X	X
loadstart	浏览器开始加载媒体数据。	X	X
pause	pause 方法返回后，回放暂停。	X	X
play	play 方法返回后，回放开始。	X	X
playing	回放开始。	X	X
progress	浏览器在获取媒体数据。	X	X
ratechange	defaultPlaybackRate 或 playbackRate 属性发生变化。	X	X (shouldn't)
seeking	seeking 属性被设置为 true，且有时间发送此事件。	X	X*
seeked	seeking 属性被设置为 false。	X	X*
stalled	浏览器获取媒体数据，但媒体数据不再到达。	X	X
suspend	浏览器暂停加载媒体数据，并且没有下载完全部的媒体资源。	X	X
timeupdate	currentTime 属性作为正常回放的一部分或因为某些其他条件发生变化。	X	X
volumechange	volume 属性或 muted 属性发生变化。	X	 
waiting	浏览器停止回放，因为它在等待下一帧。	X	X
如下列表提供了有关几个事件回放的一些注意事项。

ratechange

每当 playbackRate 发生更改，都会触发 ratechange 事件。正如之前提到的，移动版 Safari 不支持更改音频流（以及视频）的回放，所以playbackRate 不应触发。但是，自 iOS 5.1.1 起，HTML5 音频仍会触发 ratechange 事件，即便实际的回放速度并未发生改变。

volumechange

使用 JavaScript 不能更改音量，所以从不会触发 volumechange 事件。即便在移动版 Safari 打开时用户在其设备上更改了音量，也不会触发这个事件。

seeking/seeked

当这种寻找是通过 JavaScript 完成的时候，移动版 Safari 只支持 seeking 和 seeked 事件，如清单 12 所示。如果显示了内置控件，并且用户使用了进度条进行寻找，那么不会按照预期的方式触发 seeking 和 seeked。

清单 12. 设置 currentTime 将会触发 seeking 和 seeked 事件
var audio = document.getElementById('audio');
audio.currentTime = 60; // seeking and seeked will be fired
回页首

Audio sprite
使用 audio sprite 是满足移动 Safari 中多音效需求的最佳解决方案。与 CSS image sprite 类似，audio sprite 可以将所有的音频综合到一个音频流，如图 3 所示。

图 3. Audio sprite
audio sprite 是由几个音频流综合而成的一个流

原理很直观。您需要存储每个 sprite 的数据：开始点、结束点（或长度）和一个 ID。当您想要播放某个 sprite 时，需要将此音频流的currentTime 设为开始位置并调用 play()。清单 13 显示了这样的一个示例。

清单 13. 简单的 audio sprite 实现
// audioSprite has already been loaded using a user touch event
var audioSprite = document.getElementById('audio');
var spriteData = {
    meow1: {
        start: 0,
        length: 1.1
    },
    meow2: {
        start: 1.3,
        length: 1.1
    },
    whine: {
        start: 2.7,
        length: 0.8
    },
    purr: {
        start: 5,
        length: 5
    }
};

// play meow2 sprite
audioSprite.currentTime = spriteData.meow2.start;
audioSprite.play();
 

清单 13 将会播放 meow2 sprite，此外，因为没有实现当 sprite 完成后即停止的逻辑，它还会播放一个发出呜呜声的精灵。通过向清单 14 中的ontimeupdate 事件添加事件侦听程序，还可以观看 currentTime，并在 sprite 到达其结尾时结束此音频。

清单 14. 添加当到达 sprite 的结尾时停止流的逻辑
var handler = function() {
    if (this.currentTime >= spriteData.meow2.start + spriteData.meow2.length) {
        this.pause();
    }
};
audioSprite.addEventListener('timeupdate', handler, false);
 

查看并收听 本例的效果。

使用 audio sprite 的一个巨大好处是在 sprite 间切换时没有延时（类似于在音频流间切换时，假设整个 audio sprite 已经加载）。让所有的流位于一个文件中也优于削减 HTTP 请求。

清注意，更改 currentTime 并不是百分百正确的。将 currentTime 设为 6.5，而实际得到的却是 6.7 或 6.2。每个 A sprite 之间需要少量的空间，以避免寻找到另一个 sprite 的尾部。添加这个空间会增加少许延时，如果流寻找到 6.4，而 sprite 开始于 6.8 秒。

在访问任何 sprite 之前，务必确保整个音频流均已加载。这很重要，因为如果音频流没有完全加载，那么在想要访问已加载的流的任何一个部分时，那么这个流需要进行缓冲，而且还会在流加载过程中发生延时。

功能全面的示例
查看并收听 一个 audio sprite 框架的示例。这个示例考虑到了本文所讨论的这些主题。

回页首

directCanvas 和 multiSound 如何加速 HTML5 游戏性能
AppMobi 开发了一个有趣的解决方案，用 directCanvas 和 multiSound 克服移动设备上的各种 HTML5 局限性（请参阅 参考资料）。directCanvas 和 multiSound 在一个标准的 HTML5 浏览器中应用程序使用了设备的固有功能。缓慢的图片性能以及本文所讨论的这些局限性都不再是问题；您可以获得一个原生应用程序的全部性能益处。

当一个用户导航到使用了 directCanvas 的站点时，页面会提醒该用户从 App Store 下载 MobiUs 应用程序。如果用户已经在其设备上安装了此应用程序，那么页面就会在 MobiUs 应用程序中打开。

AppMobi 的站点上有在 MobiUs 应用程序中运行游戏与在移动版 Safari 中运行游戏的并排对比视频。结果很是惊人，性能获得了 10 倍的提升，如图 4 所示。

图 4. 使用 directCanvas 获得的从移动版 Safari 到 MobiUs 应用程序的平均 HTML5 性能改进
4 列线图显示了所使用的百分比

AppMobi 的 API 站点上有一些不错的文档，所以您可以立即查阅这些文档。SDK 可免费下载获得，而且还提供一个很顺手的 Google Chrome 扩展，可方便您在自己的桌面浏览器中进行开发。

虽然要求用户在其设备上安装一个应用程序并不是很理想，但 AppMobi 有一个能够博得认同的有趣解决方案。目前，App Store 还没有提供 MobiUs 应用程序，但相信 MobiUs 很快就可以上线了。

回页首

结束语
尽管本文讨论了 HTML5 音频的一些局限性，但是 HTML5 音频是对移动版 Safari 的一个很受欢迎的补充，您应该充分利用它。在本文中，我们了解了 HTML5 音频在桌面和移动版 Safari 上的限制，遍历了这些限制的解决方案，并探讨了在移动版 Safari 中使用 audio sprite 的优势。意识到移动版 Safari 的局限性可帮助提升它对您的可用性。

作为一个仍在制定中的规范，HTML5 音频必然会不断发展，但没有理由等到规范在 2014 年（推测）最后完成后才使用它。HTML5 音频提供了对所有 iOS 用户的几乎全局的兼容性，没有理由不使用它。