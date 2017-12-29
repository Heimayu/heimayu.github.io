window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( /* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

var bgImg = new Image();
var starImg = new Image();
var littleStars = [];
var num = 80;
var ball = {
  x: 100,
  y: 100,
  vx: 2,
  vy: 2
};
var star = {
  init: function() {
    var that = this;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = document.getElementById('post-canvas2').clientWidth * 0.5;
    canvas.height = document.getElementById('post-canvas2').clientWidth * 0.3;
    bgImg.src = "us.jpg";
    starImg.src = "star.png";

    for (var i = 0; i < num; i++) {
      littleStars[i] = new SingleStar();
      littleStars[i].init();
    }
    that.gameloop();
  },

  gameloop: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var that = this;
    window.requestAnimationFrame(star.gameloop);
    star.drawBg();
    star.drawGril();
    star.drawStars();
  },

  drawCircle: function() {
    //绘制一个圆
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 150, 0, Math.PI * 2);
    ctx.clip();
    ctx.closePath();
  },

  drawStars: function() {
    for (var i = 0; i < num; i++) {
      littleStars[i].update();
      littleStars[i].draw();
    }
  },

  drawBg: function() {
    ctx.fillStyle = "#393550";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.shadowColor = "#81f2f4";
    ctx.shadowBlur = 20;
  },
  drawGril: function() {
    ctx.drawImage(bgImg, 10, 10, canvas.width - 20, canvas.height - 20);
  }
};

var SingleStar = function() {};

SingleStar.prototype = {

  update: function() {
    this.x += this.xSpd;
    this.y += this.ySpd;

    if (this.x > canvas.width - 20 || this.x < 10)
      this.init();
    else if (this.y > canvas.height - 20 || this.y < 10)
      this.init();

    this.picNo += 1;
    if (this.picNo >= 7) {
      this.picNo = 0;
    }
  },

  //初始渲染
  init: function() {
    this.x = Math.random() * canvas.width + 10;
    this.y = Math.random() * canvas.height + 10;

    this.ySpd = Math.random() * 0.6 - 0.3; //[0,2) [-1, 1)
    this.xSpd = Math.random() * 0.2 - 0.1; //[0,2) [-1, 1)

    this.picNo = Math.floor(Math.random() * 7);
  },

  draw: function() {
    //drawImage(img,sx,sy,swidth,sheight,x,y,width,height) 9个参数时
    //sx: 图片的X起点
    //sy: 图片的Y起点
    //swidth:要绘制的图片选取的宽度
    //sheight:要绘制的图片选取的高度
    //x,y:图片在canvas上显示的位置
    //width,height:在Canvas上要显示的大小，进行缩放

    //this.beta += deltaTime * 0.005;

    //ctx.globalAlpha = 0.2;
    ctx.drawImage(starImg, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);

  }
}


window.onload = function() {
  star.init();
}
