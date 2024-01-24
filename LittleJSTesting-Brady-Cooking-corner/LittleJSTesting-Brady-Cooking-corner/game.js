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
const Player = new EngineObject(vec2(1,3));
const JumpForce = vec2(0,0.25);
const RightWalkSpeed = vec2(0.001,0);
const LeftWalkSpeed = vec2(-0.001,0);
const floor = new EngineObject(vec2(15,0), vec2(100, 1));
const JumpTimer = new Timer;


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
   // buildlevel();
    gameTimer.set(300);
    
    // get level data from the tiles image
    const imageLevelDataRow = 1;
    mainContext.drawImage(tileImage, 0, 0);

    tileLayer.redraw();

    // move camera to center of collision
    cameraPos = tileCollisionSize.scale(.5);

    // enable gravity
    gravity = -0.009807;
    let time = 0;
    let Time = 0;
    
    
    // Create the world
}
///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{

    localStorage.clear();
    if(MouseParticleTrailCreated){
    //MouseParticleTrail();
    }
    if (mouseWasPressed(0))
    {
        // play sound when mouse is pressed
      //  sound_click.play(mousePos);
    }
    // respawn player 
   // if (player.deadTimer > 1)
    //{
    //    player = new player(playerStartPos);
    //    player.velocity = vec2(0,.1);
   //     sound_jump.play();
   // }

    // Player Control

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 83) {
            // W
        }
        if (e.keyCode === 65) {
            // A
            Player.friction = 1;
            if(Player.velocity.x > -0.1){
            Player.applyAcceleration(LeftWalkSpeed);
            console.log(Player.velocity.x);
        }
        }
        if (e.keyCode === 87) {
            // S
            Player.applyForce(vec2(0,-1));
        }
        if (e.keyCode === 68) {
            // D
            Player.friction = 1;
            if(Player.velocity.x < 0.1){
            Player.applyAcceleration(RightWalkSpeed);
            console.log(Player.velocity.x);
        }
    }
    });
    document.addEventListener('keyup', (e) => {
        if (e.keyCode === 87) {
            // W
            Player.velocity = (vec2(0,0));
        }
        if (e.keyCode === 65) {
            // A
            Player.friction = 0.75;
        }
        if (e.keyCode === 83) { // switch the keys around to w is jump and not s.w
            // S
            Player.applyForce(vec2(0,0));
        }
        if (e.keyCode === 68) {
            // D
            Player.friction = 0.75;
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
{  // drawSky();
    //drawMoon();
    // draw a grey square in the background without using webgl
    //drawRect(cameraPos, tileCollisionSize.add(vec2(5)), new Color(.2,.2,.2), 0, 0);
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // draw to overlay canvas for hud rendering
    //drawTextScreen('LittleJS Engine Demo', vec2(mainCanvasSize.x/2, 80), 80);
    const drawText = (tet, x, y, size = 50) =>
    {
        overlayContext.textAlign = 'center';
        overlayContext.textBaseline = ' top';
        overlayContext.font = size + 'px arial';
        overlayContext.fillStyle = '#fff';
        overlayContext.lineWidth = 2;
    }

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