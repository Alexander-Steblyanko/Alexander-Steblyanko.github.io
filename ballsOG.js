// налаштовуємо графічне полотно
const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d');
const width=canvas.width=window.innerWidth;
const height=canvas.height=window.innerHeight;

// функція генерації випадкового числа
function random(min,max){
  const num=Math.floor(Math.random()*(max-min+1))+min;
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
  if((this.x+this.size)>=width){this.velX=-(this.velX);}
  if((this.x-this.size)<=0){this.velX=-(this.velX);}
  if((this.y+this.size)>=height){this.velY=-(this.velY);}
  if((this.y-this.size)<=0){this.velY=-(this.velY);}
  this.x+=this.velX;
  this.y+=this.velY;
};

// визначаємо контроль колізій куль
Ball.prototype.collisionDetect=function(){
  for(let j=0;j<balls.length;j++){
    if(!(this===balls[j])){
      const dx=this.x-balls[j].x;
      const dy=this.y-balls[j].y;
      const distance=Math.sqrt(dx*dx+dy*dy);
      if(distance<this.size+balls[j].size){
        balls[j].color=this.color='rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
      }
    }
  }
};
// визначаємо масив для зберігання куль і заповнюємо його
let balls=[];
while(balls.length<10){
  const size=random(20,30);
  let ball=new Ball(
    // розміщення кулі завжди на відстані не менше діаметру кулі від кутів полотна - щоб не було артефактів
    random(0+size,width-size),
    random(0+size,height-size),
    random(-7,7),
    random(-7,7),
    'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')',
    size
  );
  balls.push(ball);
}

// визначаємо цикл нескінченного перемальовування сцени
function loop(){
  ctx.fillStyle='rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);
  for(let i=0;i<balls.length;i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();
