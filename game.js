/*
    Little JS Starter Project
    - A simple starter project for LittleJS
    - Demos all the main engine features
    - Builds to a zip file
*/
'use strict';
// sound effects
const sound_click =    new Sound([1,.2,25,,0.1,,1,,,,,0.2,,4]);
// medals
const JumpMedal = new Medal(0, 'Geometry Dash', 'You can jump!', '🎖️');
medalsInit('Hello World');
let MouseParticleTrailCreated = false;

// game variables
let particleEmitter;
const pos = vec2(2,3);
const Player = new EngineObject(vec2(-10,3), vec2(0.999, 0.999));
const JumpForce = vec2(0,0.25);
const RightWalkSpeed = vec2(0.001,0);
const LeftWalkSpeed = vec2(-0.001,0);
const floor = new EngineObject(vec2(15,0), vec2(100, 1));
const platform = new EngineObject(vec2(0,3), vec2(10, 1));
const platform2 = new EngineObject(vec2(12,4), vec2(5, 1));
const platform3 = new EngineObject(vec2(23,6), vec2(7.5, 1));
const platform4 = new EngineObject(vec2(32,0), vec2(5, 1));
const platform5 = new EngineObject(vec2(38,7), vec2(2, 1));
const platform6 = new EngineObject(vec2(32,9.5), vec2(2, 1));
const platform7 = new EngineObject(vec2(13,15), vec2(10, 1));
const platform8 = new EngineObject(vec2(2,15), vec2(3, 1));
const platform9 = new EngineObject(vec2(-4,15), vec2(4, 1));
const platform10 = new EngineObject(vec2(-9,15), vec2(4, 1));
const JumpTimer = new Timer;
let PlayerTouchingGround = true;


///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create tile collision and visible tile layer
    initTileCollision(vec2(32, 16));

    const tileLayer = new TileLayer(pos, tileCollisionSize);
    
    Player.setCollision(1, 1, 1);
    Player.elasticity = 0.25;
    Player.friction = 1;
    floor.setCollision(1, 1, 1);
    floor.gravityScale = 0;
    floor.mass = 0;
    platform.setCollision(1, 1, 1);
    platform.gravityScale = 0;
    platform.mass = 0;
    platform2.setCollision(1, 1, 1);
    platform2.gravityScale = 0;
    platform2.mass = 0;
    platform3.setCollision(1, 1, 1);
    platform3.gravityScale = 0;
    platform3.mass = 0;
    platform4.setCollision(1, 1, 1);
    platform4.gravityScale = 0;
    platform4.mass = 0;
    platform4.color = new Color(0, 255, 0,1);
    platform5.setCollision(1, 1, 1);
    platform5.gravityScale = 0;
    platform5.mass = 0;
    platform6.setCollision(1, 1, 1);
    platform6.gravityScale = 0;
    platform6.mass = 0;
    platform7.setCollision(1, 1, 1);
    platform7.gravityScale = 0;
    platform7.mass = 0;
    platform8.setCollision(1, 1, 1);
    platform8.gravityScale = 0;
    platform8.mass = 0;
    platform9.setCollision(1, 1, 1);
    platform9.gravityScale = 0;
    platform9.mass = 0;
    platform10.setCollision(1, 1, 1);
    platform10.gravityScale = 0;
    platform10.mass = 0;
    
    // get level data from the tiles image
    const imageLevelDataRow = 1;
    mainContext.drawImage(tileImage, 0, 0);

    tileLayer.redraw();

    // move camera to center of collision
    cameraPos = tileCollisionSize.scale(.5);

    // enable gravity
    gravity = -0.009807;
    
    //setTimeout(function(){Player.applyForce(vec2(0,0.25))},1000);

    // Create the world
}
///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    localStorage.clear();
    if(MouseParticleTrailCreated){
    //MouseParticleTrail();
    }


    
    //console.log(Player.pos.y);
    //console.log(platform.pos.y+platform.size.y+0.005);
    // Player Control

    document.addEventListener('keydown', (e) => {
        if (e.keyCode == 87) {
            // W
            if(Math.round(Player.pos.y) == Math.round(floor.pos.y+floor.size.y)){
            Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform.pos.y+platform.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform2.pos.y+platform2.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform3.pos.y+platform3.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform4.pos.y+platform4.size.y)){
                //Player.elasticity = 1;
                Player.applyForce(vec2(0,2));
                //Player.elasticity = 0.25;
            }
            if(Math.round(Player.pos.y) == Math.round(platform5.pos.y+platform5.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform6.pos.y+platform6.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform7.pos.y+platform7.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform8.pos.y+platform8.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform9.pos.y+platform9.size.y)){
                Player.applyForce(vec2(0,-1));
            }
            if(Math.round(Player.pos.y) == Math.round(platform10.pos.y+platform10.size.y)){
                Player.applyForce(vec2(0,-1));
            }        
        }
        if (e.keyCode === 65) {
            // A
            Player.friction = 1;
            if(Player.velocity.x > -0.1){
            Player.applyAcceleration(LeftWalkSpeed);
            //console.log(Player.velocity.x);
        }
        }
        if (e.keyCode === 83) {
            // S
            Player.applyForce(vec2(0,-1));
        }
        if (e.keyCode === 68) {
            // D
            Player.friction = 1;
            if(Player.velocity.x < 0.1){
            Player.applyAcceleration(RightWalkSpeed);
            //console.log(Player.velocity.x);
        }
    }
    });
    document.addEventListener('keyup', (e) => {
        if (e.keyCode === 87) {
            // W
            //Player.velocity = (vec2(0,0));
        }
        if (e.keyCode === 65) {
            // A
            Player.friction = 0.5;
        }
        if (e.keyCode === 83) {
            // S
            Player.applyForce(vec2(0,0));
        }
        if (e.keyCode === 68) {
            // D
            Player.friction = 0.5;
        }
    });

    //Player.applyAcceleration(vec2(0,-1));
    
    //  respawn player if (player.deadTimer > 1) {player = new Player(playerStartPos); player.velocity = vec2(0,.1);}
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // cameraPos = cameraPos.lerp(player.pos, clamp(player.getAliveTime()/2);

    //updateParallaxLayers();
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{   //draw"sky"();
    //draw"moon"();
    // draw a grey square in the background without using webgl
    //drawRect(cameraPos, tileCollisionSize.add(vec2(5)), new Color(.2,.2,.2), 0, 0);
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // draw to overlay canvas for hud rendering
    //drawTextScreen('LittleJS Engine Demo', vec2(mainCanvasSize.x/2, 80), 80);
}
function createMouseParticleTrail(){
    particleEmitter = new ParticleEmitter(
        vec2(-20), 0,                            // emitPos, emitAngle
        1, 0, 500, PI,                          // emitSize, emitTime, emitRate, emiteCone
        0, vec2(16),                            // tileIndex, tileSize
        new Color(1,1,1),   new Color(0,0,0),   // colorStartA, colorStartB
        new Color(1,1,1,0), new Color(0,0,0,0), // colorEndA, colorEndB
        2, .2, .2, .1, .05,   // time, sizeStart, sizeEnd, speed, angleSpeed
        .99, 1, 1, PI,        // damping, angleDamping, gravityScale, cone
        .05, .5, 1, 1         // fadeRate, randomness, collide, additive
    );
    particleEmitter.elasticity = .3; // bounce when it collides
    particleEmitter.trailScale = 2;  // stretch in direction of motion
    MouseParticleTrailCreated = true;

}
// change name to win statement if needed.
function MouseParticleTrail(){
    if (mouseWasPressed(0))
    {
        // change particle color and set to fade out
        particleEmitter.colorStartA = new Color;
        particleEmitter.colorStartB = randColor();
        particleEmitter.colorEndA = particleEmitter.colorStartA.scale(1,0);
        particleEmitter.colorEndB = particleEmitter.colorStartB.scale(1,0);
    }
        if (mousePosScreen.x){
        particleEmitter.pos = mousePos;
        }

    }




///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'tiles.png');