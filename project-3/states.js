// Code borrowed/adapted from Q and lesley m
// "https://editor.p5js.org/Q/sketches/sKKhgJtLh"

// Click on screen to add more object

var Engine = Matter.Engine;
  //    Render = Matter.Render,
  var World = Matter.World;
  var MouseConstraint = Matter.MouseConstraint;
  var Mouse = Matter.Mouse;
  var Bodies = Matter.Bodies;

let engine;
let world;
let circles = [];
let imgs = [];
let grounds = [];
let mConstraint;

function preload() {
  
  for (let i = 0; i < 17; i++) {
    imgs[i] = loadImage(`asset/asset${i}.png`);
  }
}

let canvas;
// let sizes = [30, 40, 60, 80];
//let sizes = [80,100];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  //  Engine.run(engine);
  grounds.push(new Boundary(0, height / 2, 10, height));
  grounds.push(new Boundary(width, height / 2, 10, height));
  grounds.push(new Boundary(400, 0, width, 10));
  grounds.push(new Boundary(400, height, width, 10));
  World.add(world, grounds);

  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity(); // for retina displays etc
  let options = {
    mouse: mouse,
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

let count = 0;

function draw() {
  //background(0);
    clear();
  imageMode(CENTER);
  
  if (frameCount % 25 === 0) {
    print(++count);
    //let size = random(sizes);
    circles.push(new Circle(width / 2, 0));
  }
  
  
  Engine.update(engine);

  for (let circle of circles) {
    circle.show();
  }
  for (let ground of grounds) {
    ground.show();
  }
}

function mousePressed (){
  circles.push(new Circle(mouseX, mouseY, 40));
  
}

class Circle {
  constructor(x, y) {
    let options = {
      // friction: 0.3,
      // restitution: 0.6

      friction: 0.3,
      restitution: 0.1,
    };
    this.body = Bodies.circle(x, y, this.product.height - 50, options);
//    this.r = r;
    this.product = random(imgs);
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    image(this.product, 0, 0);
    pop();
  }
}

class Boundary {
  constructor(x, y, w, h) {
    let options = {
      friction: 0.3,
      restitution: 0.6,
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
  }
}