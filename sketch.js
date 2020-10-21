var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup, backgroundImage, groundImage;
var score, ground, gameover, gameoverImage, gameoverSound;
var bananaGain, survivalTime;
PLAY = 0;
END = 1;
score = 0;
gamestate = PLAY;
survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("cave1.png");
  gameoverImage = loadImage("gameOver.png");
  gameoverSound = loadSound("gameover.mp3");
  bananaGain = loadSound("banana.mp3");
}



function setup() {
  createCanvas(600, 550);
  background = createSprite(300, 300, 600, 600);
  background.scale = 3;
  background.shapeColor = "skyblue";
  monkey = createSprite(40, 385, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  ground = createSprite(300, 480, 600, 140);
  obstacleGroup = new Group();
  foodGroup = new Group();
  gameover = createSprite(300, 200)
  gameover.addImage(gameoverImage);
  
}


function draw() {
  stroke("white");
  textSize(20);
  fill("white");
  
  gameover.visible = false;
  ground.shapeColor = "green";
  monkey.scale = 0.09;
  if (gamestate == PLAY) 
   {
      monkey.collide(ground);
      
      background.velocityX = -3;
      if (background.x <= 0) 
      {
        background.x = background.width / 2;
      }
      obstacles();
      fruits();
      if (monkey.isTouching(obstacleGroup)) 
      {
        gamestate = END;
        monkey.velocityY = -15;
        gameoverSound.play();
      }
      if (monkey.isTouching(foodGroup))
      {
         bananaGain.play(); 
         foodGroup.destroyEach();
         score += 1;
      }
      if (keyWentDown("SPACE") && monkey.y === 382.37)
      {
         monkey.velocityY = -22;
      }
     survivalTime = Math.ceil(frameCount/frameRate());
     
     monkey.velocityY += 1;
   }
  if (gamestate == END)
    {
      gameover.visible = true;
      monkey.velocityY += 0.8;
      obstacleGroup.setVelocityXEach(0);
      background.velocityX = 0;
      ground.velocityX = 0;
      foodGroup.destroyEach();
      obstacleGroup.setLifetimeEach(-1);
    }
  drawSprites();
  text("SCORE: "+ score, 488, 50);
  text("SURVIVAL TIME: " + survivalTime, 200, 50);
}


function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 392, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(134);
  }
}

function fruits() {
  if (frameCount % 80 === 0) {
    var rand = Math.round(random(120, 200));
    banana = createSprite(400, rand, 10, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -3;
    foodGroup.add(banana);
    foodGroup.setLifetimeEach(136);
  }
}