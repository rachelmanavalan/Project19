var groundImg,ground,invisibleGround;
var playerImg, player;
var blockImg, block, blocksGroup;
var gamestate = "PLAY"
var score;

function preload(){
groundImg= loadImage ("geometry-dash.jpg");
playerImg= loadImage ("Screen Shot 2022-05-05 at 8.10.11 PM.png");
blockImg= loadImage ("block.png");
restartImg= loadImage ("restart.png");

}

function setup() {
 createCanvas(560,420);
 ground= createSprite (300,300);
 ground.addImage("ground",groundImg);
 ground.scale=1.5;
 blocksGroup= new Group;
 player= createSprite(100,400);
 player.addImage("player",playerImg);
 player.scale=0.19;
 invisibleGround=createSprite(310,450,580,100);
 invisibleGround.visible=false;
 score=0;
 player.setCollider("rectangle",0,0,player.width,player.height);
 player.debug=false; 
 restart=createSprite(300,260);
 restart.addImage("restart",restartImg);
 restart.scale=0.2;
 ground.velocityX = -(4 + 3* score/100);
}

function draw() {
  background ("white"); 
player.collide(invisibleGround);

if (gamestate==="PLAY"){
restart.visible=false;
    if (ground.x<200){
        ground.x=300
    }
spawnBlocks();
if (player.isTouching(blocksGroup)){
    gamestate="END";
}
if (keyDown("space")){
    player.velocityY=-16;
}
player.velocityY=player.velocityY+0.8;

score = score + Math.round(getFrameRate()/60);
drawSprites()
}


if (gamestate==="END"){
    restart.visible=true;
    blocksGroup.setVelocityXEach(0);
    blocksGroup.setLifetimeEach(-1);
    ground.velocityX=0
    drawSprites()
    textSize(30);
    fill("white");
    text ("Game Over",220,210)
    if(mousePressedOver(restart)){
        reset();
    }
}
textSize(20);
fill("white"); 
text("Score:"+ score, 50,50);


}

function reset(){
    gamestate="PLAY";
    blocksGroup.destroyEach();
    score=0;
}
    

function spawnBlocks(){
    if (frameCount%100===0){
        block=createSprite(520,380,10,10);
        block.addImage("block",blockImg);
        block.velocityX=-(4 + 3* score/100);
        block.debug=false;
        block.scale=0.35;
        block.lifetime=200
        blocksGroup.add(block);
        block.setCollider("rectangle",0,0,block.width,block.height);


    }
}
