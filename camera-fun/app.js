const video = document.getElementById('video');
const button = document.getElementById('button');
const select = document.getElementById('select');
let currentStream;

function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  let count = 1;
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

button.addEventListener('click', event => {
  console.log(navigator)
  console.log(navigator.mediaDevices)
  console.log(navigator.mediaDevice)
  console.log(navigator.getUserMedia)
  console.log(navigator.getSource)
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
  } else {
    videoConstraints.deviceId = {
      exact: select.value
    };
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  // navigator.getUserMedia(constraints, stream => {
  //   currentStream = stream;
  //   video.srcObject = stream;
  //   return navigator.mediaDevices.enumerateDevices();
  //   // gotDevices
  // }, error => {
  //   console.error(error);
  // });

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error, error.name + ": " + error.message);
    });
});

navigator.mediaDevices.enumerateDevices().then(gotDevices);