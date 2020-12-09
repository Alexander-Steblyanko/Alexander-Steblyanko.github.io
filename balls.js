// налаштовуємо графічне полотно
var canvas=document.querySelector('canvas');
var ctx=canvas.getContext('2d');
var width=canvas.width=Math.floor(window.innerWidth*0.6)-10;
var height=canvas.height=Math.floor(window.innerHeight*0.8)-50;
var record=document.getElementById('record');

// функція генерації випадкового числа
function random(min,max){
  var num=Math.floor(Math.random()*(max-min))+min;
  return num;
}

// визначаємо конструктор кулі
function Ball(x,y,velX,velY,color,size){
  this.x=x;
  this.y=y;
  this.velX=velX;
  this.velY=velY;
  this.color=color;
  this.size=size;
}

// визначаємо метод draw для кулі
Ball.prototype.draw=function(){
  ctx.beginPath();
  ctx.fillStyle=this.color;
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
};

// визначаємо метод update для кулі
Ball.prototype.update = function() {
  if((this.x)>width){enablebutton('reload'); 
	this.clear(); }
  if((this.x-this.size)<0){this.velX=-(this.velX);}
  if((this.y+this.size)>height){this.velY=-(this.velY);
	record.value += 'Lower wall bounce.\n';
	localStorage.events += new Date().toUTCString() + " Lower wall bounce.<br>";
  }
  if((this.y-this.size)<0){this.velY=-(this.velY);
	record.value += 'Upper wall bounce.\n';
	localStorage.events += new Date().toUTCString() + " Upper wall bounce.<br>";
  }
  this.x+=this.velX;
  this.y+=this.velY;
};

Ball.prototype.clear = function() {
	record.value += 'Ball out of bounds.\n';
	localStorage.events += new Date().toUTCString() + " Ball out of bounds.<br>";
	this.x = 1;
	this.y = 1;
	this.size = 0;
	this.velX = 0;
	this.velY = 0;
};

Ball.prototype.load = function() {
  record.value += 'Ball reloaded.\n';
	localStorage.events += new Date().toUTCString() + " Ball reloaded.<br>";
  this.size = 10;
  this.x = 0+this.size;
  this.y = 0+this.size;
  this.velX = 0;
  this.velY = 0;
};

Ball.prototype.play = function() {
  record.value += 'Ball has begun moving.\n';
	localStorage.events += new Date().toUTCString() + " Ball has begun moving.<br>";
  this.velX = random(1, 7);
  this.velY = random(1, 7);
};

var storedVelX = 0;
var storedVelY = 0;

Ball.prototype.pause = function() {
	record.value += 'Ball paused.\n';
	localStorage.events += new Date().toUTCString() + " Ball paused.<br>";
	storedVelX = this.velX;
	storedVelY = this.velY;
	this.velX = 0;
	this.velY = 0;
};

Ball.prototype.unpause = function() {
	record.value += 'Ball unpaused.\n';
	localStorage.events += new Date().toUTCString() + " Ball unpaused.<br>";
	this.velX = storedVelX;
	this.velY = storedVelY;
};

// визначаємо масив для зберігання куль і заповнюємо його
var size = 10;
var ball = new Ball(
	0+size,
	0+size,
	0,
	0,
	'#FFFF00',
	size
  );



// визначаємо цикл нескінченного перемальовування сцени
var bg_img = new Image(); 
bg_img.src='bg.jpg';

function loop(){
  var pat = ctx.createPattern(bg_img, 'repeat');
  ctx.fillStyle = pat;
  ctx.fillRect(0,0,width,height);
  // Background
  /*ctx.rect(0,0,width,height);
  ctx.fillStyle=pat;
  ctx.fill();*/
  // Balls
  ball.draw();
  ball.update();
  requestAnimationFrame(loop);
}
loop();