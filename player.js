/// Variables

let canvasUsed=document.getElementById("myCanvas");
 let context=canvasUsed.getContext("2d");
 let xAxis=canvasUsed.width/2;
 let yAxis=canvasUsed.height/1.1;
 let playerWidth=10;
 let playerHeight=16;
 let playerMass=0.0;
 let pMoveLeft=false;
 let pMoveRight=false;
 //Clouds
 let howManyCircles = 7, circles = [];
 for (var i = 0; i < howManyCircles; i++){
   circles.push([Math.random() * canvasUsed.width, Math.random() * canvasUsed.height, Math.random() * 100, Math.random() / 2]);
 }
  DrawCircles = function(){
  for (var i = 0; i < howManyCircles; i++) {
    context.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
//white color with transparency in rgba
    context.beginPath();
    context.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
//arc(x, y, radius, startAngle, endAngle, anticlockwise)
//circle has always PI*2 end angle
    context.closePath();
    context.fill();
  }
};
 MoveCircles = function(deltaY){
  for (let i = 0; i < howManyCircles; i++) {
    if (circles[i][1] - circles[i][2] > canvasUsed.height) {
//the circle is under the screen so we change
//informations about it
      circles[i][0] = Math.random() * canvasUsed.width;
      circles[i][2] = Math.random() * 100;
      circles[i][1] = 0 - circles[i][2];
      circles[i][3] = Math.random() / 2;
    } else {
//move circle deltaY pixels down
      circles[i][1] += deltaY;
    }
  }
};
////End Clouds

 ///Gravity
 function playerGravity(){
  //  (!playerMass==0) ? (yAxis-=playerMass,playerMass-=0.2): console.log("Error");
  if(!playerMass==0){
   yAxis-=playerMass;
   playerMass-=0.13;
  }
  if(playerMass<-4){
   playerMass=0;
   yAxis=canvasUsed.height/1.1;
  }
 }
 //Movement
 function playerMovement(){
  if(pMoveLeft==true){
   if(xAxis>0) xAxis-=1;
  }
  if(pMoveRight==true){
   if(xAxis<canvasUsed.width-playerWidth) xAxis+=1;
  }
 }
 //Key EVents
 function kdown(evt){
  if(evt.keyCode==37) pMoveLeft=true;
  if(evt.keyCode==39) pMoveRight=true;
  if(evt.keyCode==32){
   if(playerMass==0) playerMass=4;
  }
 }
 function kup(evt){
  if(evt.keyCode==37) pMoveLeft=false;
  if(evt.keyCode==39) pMoveRight=false;
 }
 /////////////////////////

 //GAMELOOP
 gameloop=setInterval(doGameLoop,10);
 window.addEventListener("keydown",kdown,true);
 window.addEventListener("keyup",kup,true);
 function doGameLoop(){
  context.clearRect(0,0,canvasUsed.width,canvasUsed.height);
  context.fillText("Use arrow keys to move and space to jump.",10,10);
  context.fillRect(xAxis,yAxis,playerWidth,playerHeight);
  playerGravity();
  playerMovement();
  MoveCircles(2);
  DrawCircles();

 }
