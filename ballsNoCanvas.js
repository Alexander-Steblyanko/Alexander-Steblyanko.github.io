// налаштовуємо графічне полотно
var width=Math.floor(window.innerWidth*0.6)-10;
var height=Math.floor(window.innerHeight*0.8)-50;
var record=document.getElementById('record');

function updatePosition() {
	document.getElementById("Ball").style.left = x + 'px';
	document.getElementById("Ball").style.top = y + 'px';
}

// функція генерації випадкового числа
function random(min,max){
  var num=Math.floor(Math.random()*(max-min))+min;
  return num;
}

// визначаємо конструктор кулі
function Ball(xIn,yIn,velX,velY,size){
  x = xIn;
  y = xIn;
  this.velX=velX;
  this.velY=velY;
  this.size=size;
}

// визначаємо метод update для кулі
Ball.prototype.update = function() {
  if((x+this.size)>width){enablebutton('reload'); 
	this.clear(); }
  if((x)<0){this.velX=-(this.velX);}
  if((y+2*this.size)>height){this.velY=-(this.velY);
	record.value += 'Lower wall bounce.\n';
	localStorage.events += new Date().toUTCString() + " Lower wall bounce.<br>";
  }
  if((y)<0){this.velY=-(this.velY);
	record.value += 'Upper wall bounce.\n';
	localStorage.events += new Date().toUTCString() + " Upper wall bounce.<br>";
  }
  x+=this.velX;
  y+=this.velY;
  updatePosition();
};

Ball.prototype.clear = function() {
	record.value += 'Ball out of bounds.\n';
	localStorage.events += new Date().toUTCString() + " Ball out of bounds.<br>";
	x = 1;
	y = 1;
	this.velX = 0;
	this.velY = 0;
	updatePosition();
	document.getElementById("Ball").style.backgroundImage = 'none';
};

Ball.prototype.load = function() {
  record.value += 'Ball reloaded.\n';
	localStorage.events += new Date().toUTCString() + " Ball reloaded.<br>";
  this.size = 10;
  x = 0;
  y = 0;
  this.velX = 0;
  this.velY = 0;
	updatePosition();
  document.getElementById("Ball").style.backgroundImage = 'url(ball.png)';
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
	0,
	0,
	0,
	0,
	size
  );



// визначаємо цикл нескінченного перемальовування сцени
var bg_img = new Image(); 
bg_img.src='bg.jpg';

function loop(){
  ball.update();
  requestAnimationFrame(loop);
};
loop();