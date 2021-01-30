var dog, dogImg,happyDog, database,foods,foodStock;
var food, addFood;
var fedTime,lastFed;
var foodObj;

function preload(){
  dogImg=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
foodObj=new food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

feed=createButton("feed the dog");
feed.positio(700,95);
feed.mousePressed(feedDog);

addFood=createButton("add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);

fedTime=database.ref(FeedTime);
fedTime.on("value",function(data){
lastFed=data.val();
})

fill (255);
textSize(20);
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30)
}else if(lastFed==0){
  text("'Last Feed: 12 AM",350,30)
}else {
  text ( "Last Feed : "+ lastFed +"AM",350,30 );
}


foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({ 
    Food:foodObj.getFoodStock(),
    FeedTime:hour ()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({ 
    Food:foodS
  })
}