const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var bg_img,food,rabbit;
var bunny;
var button;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20);

  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  bunny = createSprite(250,650,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  rope = new Rope(8,{x:220,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  //imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);
  rope.show();

  push();
  imageMode(CENTER);
  if (fruit!=null) {
    image(food,fruit.position.x,fruit.position.y,60,60);
  }
  pop();

  Engine.update(engine);
  ground.show();

  drawSprites();
   
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}