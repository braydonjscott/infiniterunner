var background1, backgroundimage, spikeimage, runner, runnerimage, spikegroup
var ground
var score

function preload(){
    backgroundimage = loadImage("hills.png")
    spikeimage = loadImage("spike.png")
    runnerimage = loadImage("monkey.png")
}

function setup(){
    createCanvas(400,200)
    score=0
    background1 = createSprite(200,100,20,20)
    background1.addImage(backgroundimage)
    background1.scale=1.75
    background1.velocityX=3
    runner = createSprite(70,158,20,20)
    runner.addImage(runnerimage)
    runner.scale=0.375
    runner.setCollider("rectangle",0,0,100,82)
    ground = createSprite(200,188,400,10)
    ground.visible=false
    spikegroup = new Group()
}

function draw(){
    background("white")
    spikes()
    if(background1.x>265){
        background1.x=background1.x/2
    }
    if(keyDown("space")&&runner.y>150){
        runner.velocityY=-10
    }
    if(runner.isTouching(spikegroup)){
        spikegroup.setLifetimeEach(-1)
        spikegroup.setVelocityXEach(0)
        ground.velocityX=0
        background1.velocityX=0
    }
    runner.velocityY+=0.8
    runner.collide(ground)
    score = score + Math.round(getFrameRate()/40)
    fill("green")
    text("score="+score,200,200)
    drawSprites()
}

function spikes(){
    if(frameCount%60===0){
        var spike = createSprite(400,163,20,20)
        spike.addImage(spikeimage)
        spike.velocityX = -3
        spike.lifetime = 150
        spike.scale=0.25
        spikegroup.add(spike)
    }
}