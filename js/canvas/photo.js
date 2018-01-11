var scale = 1.3;
var mr = 100;
var photo = {
  //初始化
  init: function() {
    var that = this;

    that.canvas = document.getElementById('canvas');
    that.ctx = that.canvas.getContext('2d');

    that.canvas2 = document.getElementById('canvas2');
    that.ctx2 = that.canvas2.getContext('2d');

    that.canvas3 = document.getElementById('canvas3');
    that.ctx3 = that.canvas3.getContext('2d');

    that.canvas.width = document.getElementById('post-canvas3').clientWidth * 0.6;
    that.canvas.height = document.getElementById('post-canvas3').clientWidth * 0.35;

    that.canvas2.width = that.canvas.width * scale;
    that.canvas2.height = that.canvas.height * scale;

    that.canvas3.width = 200;
    that.canvas3.height = 50;

    that.image1 = new Image();
    that.image1.src = "name1.png";

    that.image2 = new Image();
    that.image2.src = "name2.png";

    that.image1.onload = function() {
      that.ctx.drawImage(that.image1, 0, 0, that.canvas.width, that.canvas.height);
    };

    that.image2.onload = function() {
      that.ctx2.drawImage(that.image2, 0, 0, that.canvas2.width, that.canvas2.height);
      that.moveEvt();
    };

    that.filltext();
  },

  filltext: function() {
    var that = this;
    that.ctx3.font = "bold 14px Microsoft Arail";
    //that.ctx3.fillStyle = "rgba(255,255,255,0.5)";
    var gradient=that.ctx3.createLinearGradient(0,0,0,that.canvas3.height);
    gradient.addColorStop("0","#9eddf1");
    gradient.addColorStop("0.5","#fff");
    gradient.addColorStop("1.0","#9eddf1");
    // Fill with gradient
    that.ctx3.fillStyle=gradient;
    that.ctx3.textBaseline = "middle";
    that.ctx3.fillText("www.webhmy.com", 35, 40)
  },

  bigerImage: function(x, y) {
    var that = this;
    var imageX = x * scale,
      imageY = y * scale,
      sx = imageX - mr,
      sy = imageY - mr;

    var dx = x - mr,
      dy = y - mr;

    that.ctx.save();

    that.ctx.strokeStyle = "#9eddf1";
    that.ctx.lineWidth = 3;

    that.ctx.beginPath();
    that.ctx.arc(x, y, mr, 0, Math.PI * 2);


    that.ctx.shadowColor = "#6ed25b";
    // 阴影的羽化值
    that.ctx.shadowBlur = 10;
    that.ctx.stroke();
    that.ctx.clip();


    that.ctx.drawImage(that.canvas2, sx, sy, 2 * mr, 2 * mr, dx, dy, 2 * mr, 2 * mr);
    that.ctx.drawImage(that.canvas3, dx,dy);
    that.ctx.restore();
  },

  //移动
  moveEvt: function() {
    var that = this;
    that.canvas.onmousedown = function(e) {
    	that.flag = true;
      that.showImage(e);
    }

    that.canvas.onmousemove = function(e) {
      if (that.flag) {
        that.showImage(e)
      }
    }

    that.canvas.onmouseup = function(e) {
      that.hideImage(e)
    }

    that.canvas.onmouseout = function(e) {
      that.hideImage(e)
    }
  },

  showImage: function(e) {
  	e.preventDefault()
    var x = e.offsetX,
      y = e.offsetY,
      that = this;
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
    that.ctx.drawImage(that.image1, 0, 0, that.canvas.width, that.canvas.height);
    that.bigerImage(x, y);
  },

  hideImage: function(e) {
  	e.preventDefault()
    var that = this;
    
    that.flag = false;
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
    that.ctx.drawImage(that.image1, 0, 0, that.canvas.width, that.canvas.height);
  },

  //灰色
  changeImage: function() {
    var that = this;
    var imageData = that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height);
    var pixData = imageData.data;

    for (var i = 0; i < that.canvas.width * that.canvas.height; i++) {
      var r = pixData[i * 4 + 0],
        g = pixData[i * 4 + 1],
        b = pixData[i * 4 + 2];

      var grey = r * 0.3 + g * 0.59 + b * 0.11;

      pixData[i * 4 + 0] = grey;
      pixData[i * 4 + 1] = grey;
      pixData[i * 4 + 2] = grey;
    };

    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
    that.ctx.putImageData(imageData, 0, 0, 0, 0, that.canvas.width, that.canvas.height)
  }

}

window.onload = function() {
  photo.init();
}
