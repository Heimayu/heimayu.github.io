/**
 * 炫彩之旅-初识canvas(一)
 * @author heimayu
 * @time   2017-12-25
 */

var test1 = {
  //获取当前时分秒
  getTime: function() {
    var d = new Date(),
      t = {
        h: d.getHours(),
        m: d.getMinutes(),
        s: d.getSeconds()
      };

    return {
      h: t.h.toString().length === 2 ? t.h : '0' + t.h,
      m: t.m.toString().length === 2 ? t.m : '0' + t.m,
      s: t.s.toString().length === 2 ? t.s : '0' + t.s
    }
  },

  //初始化
  init: function() {
    var that = this;
    if (that.timer) {
      that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
      clearInterval(that.timer);
    }


    that.canvas = document.getElementById('myCanvas'),
      that.ctx = that.canvas.getContext('2d');

    that.canvas.width = document.getElementById('post-canvas').clientWidth * 0.84;
    that.canvas.height = 300;

    var t = that.getTime();
    that.lastH = t.h;
    that.lastM = t.m;
    that.lastS = t.s;
    that.drawCircle([t.h, t.m, t.s]);

    that.timer = setInterval(function() {
      var t = that.getTime();
      that.drawCircle([t.h, t.m, t.s]);
    }, 50);
  },

  //绘制数字
  drawCircle: function(t) {
    var that = this;
    //清除画布
    that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);

    //画线
    that.drawLine(120);

    //获取位置间隔
    that.space = Math.floor(that.ctx.canvas.width / 8);
    for (var i = 0; i < 3; i++) {
      var j;
      switch (i) {
        case 0:
          j = 0;
          break;
        case 1:
          j = 3;
          break;
        case 2:
          j = 6;
          break;
      }
      that.rendDigit(j * that.space, 20, parseInt(t[i] / 10));
      that.rendDigit((j + 1) * that.space, 20, parseInt(t[i] % 10));

      //画冒号
      if (i < 2) {
        that.rendDigit((j + 2) * that.space, 20, 10);
      }
    };

    //当数字改变的时候
    if (parseInt(that.lastH / 10) != parseInt(t[0] / 10)) {
      that.rendDigit(0, 20, parseInt(t[0] / 10), true);
    }

    if ((that.lastH % 10) != parseInt(t[0] % 10)) {
      that.rendDigit(0, 20, parseInt(t[0] % 10), true);
    }

    if (parseInt(that.lastM / 10) != parseInt(t[1] / 10)) {
      that.rendDigit(3 * that.space, 20, parseInt(t[1] / 10), true);
    }

    if ((that.lastM % 10) != parseInt(t[1] % 10)) {
      that.rendDigit(4 * that.space, 20, parseInt(t[1] % 10), true);
    }

    if (parseInt(that.lastS / 10) != parseInt(t[2] / 10)) {
      that.rendDigit(6 * that.space, 20, parseInt(t[2] / 10), true);
    }

    if ((that.lastS % 10) != parseInt(t[2] % 10)) {
      that.rendDigit(7 * that.space, 20, parseInt(t[2] % 10), true);
    };

    //更新上个时分秒
    that.lastH = t[0];
    that.lastM = t[1];
    that.lastS = t[2];

    //更新彩色小球的位置
    that.updateBalls();
  },

  //渲染数字
  rendDigit: function(x, y, num, boolean) {
    var R = document.body.clientWidth > 800 ? 4 : 2,
      	colors = ["#f9f51a", "#a594c0", "#fa8ecc", "#caff67", "#f9f51a", "#a594c0", "#caff67", "red", "pink", "green", "blue"],
      	that = this;

    //放置彩色小球的数组
    if (!that.balls) {
      that.balls = [];
    }

    //遍历数字矩阵位置，根据位置画小圆
    for (var i = 0, len = digit[num].length; i < len; i++) {
      digit[num][i].forEach(function(val, j) {
      	//当数字是1的时候画圆
        if (val === 1) {
          that.ctx.beginPath();
          that.ctx.arc(x + j * 2 * (R + 1) + (R + 1), y + i * 2 * (R + 1) + (R + 1), R, 0, 2 * Math.PI);
          that.ctx.fillStyle = '#caff67';
          that.ctx.fill();

          //这里表示要绘制彩色小球，所有的数字都是随机的好吗？
          if (boolean) {
            //生成彩色的小球 
            var ball = {
              x: x + j * 2 * (R + 1) + (R + 1),
              y: y + i * 2 * (R + 1) + (R + 1),
              g: 1.5 + Math.random(),
              vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
              vy: -5,
              color: colors[Math.floor(Math.random() * 10)]
            };
            that.balls.push(ball);
          }
        }
      })
    };
  },

  //更新小球的位置
  updateBalls: function() {
    var that = this;
    for (var i = 0; i < that.balls.length; i++) {  	
      //设置新的位置
      that.balls[i].x -= that.balls[i].vx;
      that.balls[i].y += that.balls[i].vy;
      that.balls[i].vy += that.balls[i].g;

      if (that.balls[i].y > 296) {
        that.balls[i].y = 296;
        that.balls[i].vy = -that.balls[i].vy * 0.6;
      }
      //绘制新的彩色小球
      that.render(that.balls[i]);
    }

  },

  render: function(ball) {
  	var R = document.body.clientWidth > 800 ? 4 : 2;
    this.ctx.beginPath();
    this.ctx.arc(ball.x, ball.y, R, 0, 2 * Math.PI);
    this.ctx.fillStyle = ball.color;
    this.ctx.fill();
  },

  drawLine: function(y) {
    var that = this;
    that.ctx.beginPath();
    that.ctx.moveTo(0, y);
    that.ctx.lineTo(that.ctx.canvas.width, y);

    that.ctx.setLineDash([1]);
    that.ctx.lineWidth = 3;
    that.ctx.strokeStyle = "#caff67";
    that.ctx.stroke()

  }
};

window.onload = function() {
  test1.init();
};

window.onresize = function() {
  test1.init();
}
