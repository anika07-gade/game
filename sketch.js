var PLAY = 1;
var END = 0;
 var gameState = PLAY;

var unicorn, unicornImage;
var ground, invisibleGround;

var pink_balloonImage,red_balloonImage,blue_balloonImage,pinkB,redB,blueB; 
var donutGroup, donut2, donut1,donut3,donut4;
var score = 0;
var life = 10 ;

var gameOver, restart;

function preload() {
  red_balloonImage = loadImage("red_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
  donut2 = loadImage("5a35ebfbed4315.7968703315134832599718.png");
  donut1 = loadImage("Doughnut (33).png");
  donut3=loadImage("candy.png");
  donut4=loadImage("cup-cake.png");
  gameOverImg = loadImage("PngItem_1457399.png");
  restartImg = loadImage("restart.png");

 

}

function setup() {
  createCanvas(600, 600);
  unicorn = createSprite(50, 175, 20, 50);
  unicorn.addImage("unicorn", unicornImage);
  unicorn.scale = 0.02;
 
  unicorn.setCollider("rectangle",0,0,unicorn.width,unicorn.height);

  ground = createSprite(0, 590, 1200, 30);
  ground.shapeColor="green";
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(300,75);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.05;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

   redB=new Group();
   blueB = new Group();
   pinkB =new Group();
  
    donutGroup = new Group();

    score = 0;
  }

  function draw() {
    background("blue");
    textSize(20);
    fill("yellow");
    text("Score= " + score, 500, 40);
    text("Lives= " + life, 500, 65);
    //text("life: "+ life , 500,60);
    drawSprites();
    
    if (gameState === PLAY) {
      // score = score + Math.round(getFrameRate()/60);
      if (score >= 0) {
        ground.velocityX = -6;
      } else {
        ground.velocityX = -(6 + 3 * score / 100);
      }

      if(unicorn.isTouching(redB))
      {
       redB.destroyEach();
      
       score = score+2;  
         
      }

      if(unicorn.isTouching(pinkB))
      {
       pinkB.destroyEach();
       
       score = score+3;  
      }

      if(arrowGroup.isTouching(blueB))
      {
       blueB.destroyEach();
      
       score = score+2;  
      }
    
      if (keyDown("up_arrow") && unicorn.y >= 139) {
        unicorn.velocityY = -12;
      }
  
      unicorn.velocityY = unicorn.velocityY + 0.8
  
      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }
  
      unicorn.collide(ground);
      var select_balloon = Math.round(random(1,4));
  
      if (World.frameCount % 100 == 0)
    {
      if (select_balloon == 1) 
      {
        redBalloon();
      } else if (select_balloon == 2) 
      {
        greenBalloon();
      } else if (select_balloon == 3)
      {
        blueBalloon();
      } else {
        pinkBalloon();
      }
    }
      spawnDonut();

      if (donutGroup.isTouching(unicorn)) {
        life = life - 1;
        gameState = END;
      }
  if (score>0){
    text("keep going!!",20,20);
    
  }
}

}  if (gameState === END) {

  restart.visible = true;


  //set velcity of each game object to 0
  ground.velocityX = 0;
  unicorn.velocityY = 0;
  donutGroup.setVelocityXEach(0);
  coinGroup.setVelocityXEach(0);



  //set lifetime of the game objects so that they are never destroyed
  donutGroup.setLifetimeEach(-1);
  coinGroup.setLifetimeEach(-1);
  if (life === 0) {
    text("better luck next time",20,20);
    gameOver.visible = true;
  }
  if (mousePressedOver(restart)) {
    if (life > 0) {

      reset();
    }
  }
}

function redBalloon()
{
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
  return red
  
}

function blueBalloon()
{
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
  return blue;
}

function pinkBalloon()
{
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;  pink.scale = 1
  pinkB.add(pink);
  return pink;
}

coin.depth = unicorn.depth;
unicorn.depth = unicorn.depth + 1;

function spawnDonut() {
  if (frameCount % 60 === 0) {
    var donut = createSprite(600, 565, 10, 40);
    //generate random donuts
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        donut.addImage(donut2);
        break;
      case 2:
        donut.addImage(donut1);
        break;
        case 3:
        donut.addImage(donut3);
        break;
case 4:
        donut.addImage(donut4);
        break;
    }

    donut.velocityX = -(6 + 3 * score / 100);

    //assign scale and lifetime to the donut           
    donut.scale = 0.07;
    donut.lifetime = 300;
    //add each donut to the group
    donutGroup.add(donut);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  donutGroup.destroyEach();
 


  score = 0;

}
