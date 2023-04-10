// Defining Variables

var playerTank;
var nonPlayerTank;
var germ1;
var germ2;
var germ3;
var bullet;
var background;
var ammo;
var ammoCount = 50;
var oneLife;
var twoLives
var threeLives;
var zeroLives;
var germsKilled = 0;



function preload(){
  // Loading Images

  germ1Image = loadImage("images/germs-1.png");
  germ2Image = loadImage("images/germs-2.png");
  germ3Image = loadImage("images/germs-3.png");
  playerTankImage = loadImage("images/player-tank.png");
  nonPlayerTankImage = loadImage("images/non-player-tank.png");
  bulletImage = loadImage("images/bullet-2.png");
  backgroundImage = loadImage("images/background 4.png");
  ammoImage = loadImage("images/ammo-reload.png");
  oneLifeImage = loadImage("images/1 life.png");
  twoLifeImage = loadImage("images/2 lives.png");
  threeLifeImage = loadImage("images/3 lives.png");
  zeroLifeImage = loadImage("images/0 lives.png");
  
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  // Creation of sprites
  playerTank = createSprite(width/2-100,height-75,400,250);
  playerTank.addImage(playerTankImage);
  playerTank.scale = 0.2

  oneLife = createSprite(width/2-150, height-400, 50,60);
  oneLife.addImage(oneLifeImage);
  oneLife.addImage(twoLifeImage);
  oneLife.addImage(threeLifeImage);
  oneLife.addImage(zeroLifeImage);
  oneLife.changeImage(threeLifeImage);

  
  // Germs Groups
  germs1 = new Group();
  germs2 = new Group();
  germs3 = new Group();

  // Spawning of germs
  spawnGerms(germs1, 20, germ1Image, 0.3);
  spawnGerms(germs2, 20, germ2Image, 0.2);
  spawnGerms(germs3, 20, germ3Image, 0.2);
}


function draw() 
{
  background("black");
  image(backgroundImage, 0, -height*5, width, height*6);

  // text
  textSize(15);
  fill("black");
  text("AMMO COUNTER: "+ammoCount, width-175, height-400);

  textSize(15);
  fill("black");
  text("SCORE: "+germsKilled, width-100, height-40);


  camera.position.y = playerTank.y-150;
  camera.position.x = playerTank.x-150;

  
  tankControls();
  shooting();
  spawnAmmo();
  collision();
  
  

  drawSprites()
}

function spawnGerms(groupName, numSprites, spriteImage, scale){

  for(i=0; i<numSprites; i++) {
    var x,y;
    x = random(width/2-300, width/2+375);
    y = random(-height*4.5,height-400);
    var sprite = createSprite(x,y);
    sprite.addImage(spriteImage)
    sprite.scale = scale;
    groupName.add(sprite);
    
  }
  
}

function spawnAmmo(){
  if(frameCount%80 === 0){

    ammo = createSprite(90, 50, 30, 50);
    ammo.addImage(ammoImage);
    ammo.scale = 0.1
    ammo.x = random(width/2-300, width/2+375);
    ammo.y = random(-height*4.5,height-400);

}

}

  function tankControls(){
    if(keyDown(UP_ARROW)) {
      playerTank.y -= 5
      playerTank.rotateToDirection = true
      playerTank.rotation = 0
    }

    if(keyDown(DOWN_ARROW)) {
      playerTank.y += 5
    }

    if(keyDown(RIGHT_ARROW)){
      playerTank.x += 5
      playerTank.rotateToDirection = true
      playerTank.rotation = 90
    }

    if(keyDown(LEFT_ARROW)){
      playerTank.x -= 5
      playerTank.rotateToDirection = true
      playerTank.rotation = -90
    }

    
  }

function shooting(){
  if(keyWentDown("space")){
    
    bullet = createSprite(playerTank.x, playerTank.y, 50, 80);
    bullet.addImage(bulletImage);
    bullet.scale = 0.2;
    bullet.x = playerTank.x;
    bullet.y = playerTank.y;
    bullet.velocityY = -9



  }

  if(playerTank.rotation === 90 && keyWentDown("space")){
    bullet.rotation = 90;
    bullet.velocityX = 9;
    bullet.velocityY = 0;
    bullet.x = playerTank.x + 40;
    bullet.y = playerTank.y;
    bullet.visible = true;
    ammoCount -= 1
  }

  if(playerTank.rotation === -90 && keyWentDown("space")){
    bullet.rotation = -90;
    bullet.velocityX = -9;
    bullet.velocityY = 0;
    bullet.x = playerTank.x - 40;
    bullet.y = playerTank.y;
    bullet.visible = true;
    ammoCount -= 1
  }

  if(playerTank.rotation === 0 && keyWentDown("space")){
    bullet.rotation = 0;
    bullet.velocityX = 0;
    bullet.velocityY = -9;
    bullet.x = playerTank.x;
    bullet.y = playerTank.y - 40;
    bullet.visible = true;
    ammoCount -= 1
  }
}

function collision(){
  playerTank.overlap(germs1, function(collector, collected){
    germsKilled += 1;
    collected.remove();
    gameOver()
  })
}

function collision2(){
  bullet.overlap(germs2, function(collector, collected){
    germsKilled += 1;
    collected.remove();

  })
}

function collision3(){
  bullet.overlap(germs3, function(collector, collected){
    germsKilled += 1;
    collected.remove();

  })
}

function gameOver(){
  swal({
    title: "Game Over",
    text: "Well tried!",
    imageUrl: "https://www.nicepng.com/png/detail/279-2798361_military-tank-clipart-realistic-tank-cartoon-png.png",
    imageSize: "150x150",
    confirmButtonText: "Play Again"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload()
    }
  })

}



