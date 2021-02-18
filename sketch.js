
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var drops =[];
var score=0;
var gameState="start";
function preload()
{
	
	emptyGlass=loadImage("glass.png");
	filledGlass=loadImage("FG.png");
	gameEnded=loadImage("GEB.PNG");
	gameStarted=loadImage("GSB.PNG");
	Ready=loadImage("ready button.png");

	splash=loadAnimation("splash-unscreen.gif");
	
	water=loadImage("water(smile).jpg");
	car=loadImage("car.png");
  garden=loadImage("garden.jpg");
  backgroundimg=loadImage("bg.jfif");
  carBg=loadImage("car_bg.jfif");
upsideGlass=loadImage("upsideGlass.png")
	
}

function setup() {
	createCanvas(800, 400);


	engine = Engine.create();
	world = engine.world;


glass1=new glass(400,280,20,20);
filledGlass=new glass(400,280,20,20);
ground1=new ground(400,390,800,10);
startButton=createSprite(375,200,20,30);
startButton.scale=0.25;
startButton.addImage(gameStarted);
endButton=createSprite(375,200,20,30);
endButton.scale=0.25;
endButton.addImage(gameEnded);
endButton.visible=false;
//startButton.mousePressed(startGame);
gardenButton=createSprite(300,100,30,30);
gardenButton.addImage(garden);
gardenButton.visible=false;

carButton=createSprite(600,100,30,30);
carButton.addImage(car);
carButton.visible=false;

// set gameStarted equal to false
//gameStarted = false;


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundimg);

  ground1.display();
  glass1.display();
 // display score
 fill("red");
 noStroke();
 textSize(24);
 text("Score: " + score, 30, 50);
  if(gameState === "play")
  {
   
    // hide start button
    startButton.visible=false;
  
    // display glass
    glass1.display();
	var r = Math.ceil(random(30));
    if(r == 1)
    {
      drops.push(new drop());
    }
  
    // loop through each drop
    for (var j=0; j<drops.length; j++) 
    {
      // display dots
      drops[j].display();
    
      // check if dot reaches bottom of screen
      if(drops[j].ypos > 500)
      {
        // remove dot
        drops.splice(j, 1);
    
      } else {
    
        // check if pacman is touching dot
        var d2 = dist(drops[j].xpos, drops[j].ypos, glass1.xpos, glass1.ypos);
        if(d2 < 25)
        {
          // remove dot
          drops.splice(j, 1);
        
          // increase score by one
          score++;
    
        }
      }
      
    }
  
    // check for game over
    if(score >=10)
    {
      
      score = 0;      
    
	drops = [];
      //endButton.visible=true;
gardenButton.visible=true;
carButton.visible=true;
glass1.image=loadImage("FG.png");
      
      // set gameStarted to false
      gameState = "end";
    }
  
  }
  if(mousePressedOver(startButton)){
    startGame();
  }
  if(mousePressedOver(carButton)&& gameState==="end"){
    backgroundimg=loadImage("car_bg.jfif");
    carButton.visible=false;
    gardenButton.visible=false;
    glass1.image=null;
    
    
  }
  if(mousePressedOver(gardenButton)&& gameState==="end"){
    backgroundimg=loadImage("garden.jpg");
    carButton.visible=false;
    gardenButton.visible=false;
    glass1.image=null;
  }
  drawSprites();
}

function startGame()
{
  // change gameStarted variable
  gameState = "play";
  
 gameEnded.visible=false;
}
