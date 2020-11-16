var tower, towerImage;
var ghost, ghostImage ;   
var door , doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleblock, invisibleblockGroup
var gameState = "play";
var sound;

function preload (){

  towerImage =  loadImage ("tower.png");

  ghostImage = loadImage ("ghost-standing.png");
  
  doorImage = loadImage ("door.png");
  
  climberImage = loadImage ("climber.png");
  
  sound = loadSound ("spooky.wav");
}

function setup (){
createCanvas (600,600);
  
  //sound. loop();

 tower = createSprite (300,300);
 tower.addImage ("tower", towerImage);
 tower.velocityY = 1;
  
 ghost = createSprite (300, 300, 50, 50);
 ghost. addImage ("ghost", ghostImage);
 ghost.scale = 0.3; 
  
  
  climberGroup = new Group();  
  
  doorGroup = new Group();
  
  invisibleblockGroup = new Group();
  
}



function draw (){
 background (0); 
  
  if (gameState === "play"){
    
  
  
  if (tower.y > 400){
    tower.y = 300;
   }
  
 if (keyDown (LEFT_ARROW)){
     ghost.x = ghost.x - 3;
  }
  
  if (keyDown (RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }
  
  if (keyDown ("space")){
    ghost.velocityY = - 3;
  }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
  
  spawnDoors();
  
  if (climberGroup.isTouching(ghost) ){
    ghost.velocityY = 0;
    
  }
    
  if (invisibleblockGroup.isTouching (ghost) || ghost.y > 600){
  ghost.destroy(); 
    
    gameState = "end";
    
    }
  
  
  drawSprites (); 
    
}
  if (gameState==="end"){
    fill ("yellow");
    stroke ("red");
    textSize (30);
    text ("GameOver", 230, 250);
  }
    
    
  }

function spawnDoors (){
  if (frameCount % 250 === 0){
    
  door = createSprite (300, 50, 90, 100);
  door.addImage ("door", doorImage);
  door.velocityY = 1;
  door.x = Math.round(random (120, 400));
  door.liftime = 600;
  
  climber = createSprite (300, 100, 100, 20);  
  climber.addImage ("climber", climberImage); 
  climber.velocityY = 1;
  climber.x = door.x;
  climber.lifetime = 600;
    
   invisibleblock = createSprite (300, 110);
   invisibleblock. width = climber.width ;
   invisibleblock.height = 2;
   invisibleblock.debug = true;
   
   invisibleblock.velocityY = 1; 
   invisibleblock.x = door.x; 
    
    ghost.depth = door.depth;
    ghost.depth+= 1; 
    
    doorGroup.add (door);
    climberGroup.add (climber);
    invisibleblockGroup.add (invisibleblock);
    
  }
}
