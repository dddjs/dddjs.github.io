(function (win){
  var effect = {};

  // 卷积矩阵计算
  function ConvolutionMatrix(input, m, divisor, offset){
    var output = document.createElement("canvas").getContext('2d').createImageData(input);
    var w = input.width, h = input.height;
    var iD = input.data, oD = output.data;
    // 对除了边缘的点之外的内部点的 RGB 进行操作，透明度在最后都设为 255
    for (var y = 1; y < h-1; y += 1) {
      for (var x = 1; x < w-1; x += 1) {
        for (var c = 0; c < 3; c += 1) {
          var i = (y*w + x)*4 + c;
          // 卷积核计算
          oD[i] = offset
            +(m[0]*iD[i-w*4-4] + m[1]*iD[i-w*4] + m[2]*iD[i-w*4+4]
            + m[3]*iD[i-4]     + m[4]*iD[i]     + m[5]*iD[i+4]
            + m[6]*iD[i+w*4-4] + m[7]*iD[i+w*4] + m[8]*iD[i+w*4+4])
            / divisor;
        }
        oD[(y*w + x)*4 + 3] = 255; // 设置透明度为不透明
      }
    }
    return output;
  }

  effect.normal = function (canvasData){
    return canvasData;
  }

  /**
   * 灰度
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.deEmphasize = function (canvasData){
    var d = canvasData.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      // CIE luminance for the RGB
      // The human eye is bad at seeing red and blue, so we de-emphasize them.
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      d[i] = d[i+1] = d[i+2] = v
    }

    return canvasData
  }

  /**
   * 亮度调整
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.light = function (canvasData){
    var data = canvasData.data;
    var adjustment = 100;

    for (var i=0; i<data.length; i+=4) {
      data[i] += adjustment;
      data[i+1] += adjustment;
      data[i+2] += adjustment;
    }

    return canvasData;
  }

  /**
   * 透明处理
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.opacity = function (canvasData){
    var data = canvasData.data;

    for (var i=3; i<data.length; i+=4) {
      data[i] = 255/2;
    }

    return canvasData;
  }

  /**
   * 锐化
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.sharpness = function (canvasData){
    var matrix = [
      0,  -1, 0,
      -1, 5,  -1,
      0,  -1, 0
    ];

    return ConvolutionMatrix(canvasData, matrix, 1, 0);
  }

  /**
   * 模糊
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.blur = function (canvasData){
    var matrix = [
      1,  1,  1,
      1,  1,  1,
      1,  1,  1
    ];

    return ConvolutionMatrix(canvasData, matrix, 9 ,0);
  }

  /**
   * 浮雕处理
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.embossing = function (canvasData){
    var matrix = [
      -2, -1, 0,
      -1, 1,  1,
      0,  1,  2
    ];

    return ConvolutionMatrix(canvasData, matrix, 1 ,0);
  }

  /**
   * 反色
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.opposite = function (canvasData){
    var data = canvasData.data;

    for (var i=0; i<data.length; i+=4) {
      data[i] = 255 - data[i];
      data[i+1] = 255 - data[i+1];
      data[i+2] = 255 - data[i+2];
    }

    return canvasData;
  }

  /**
   * 横向边缘检测，为了效果更好，可以适当调整亮度
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.edgeDetection = function (canvasData){
    var matrix = [
      0,  0,  0,
      -1, 1,  0,
      0,  0,  0
    ];

    return ConvolutionMatrix(canvasData, matrix, 1,100);
  }

  /**
   * 对比度增强，为了效果更好，可以适当调整亮度
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.contrast = function (canvasData){
    var matrix = [
      0, 0, 0,
      0, 2, 0,
      0, 0, 0
    ];

    return ConvolutionMatrix(canvasData, matrix, 1,100);
  }

  /**
   * 索贝尔横向边缘检测
   * @param  {[type]} canvasData [description]
   * @return {[type]}            [description]
   */
  effect.sobelEdgeDetection = function (canvasData){
    var matrix = [
      -1, 0, 1,
      -2, 0, 2,
      -1, 0, 1
    ];

    return ConvolutionMatrix(canvasData, matrix, 1,0);
  }

  window.effect = effect;
})(window)