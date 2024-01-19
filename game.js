/*
    Little JS Starter Project
    - A simple starter project for LittleJS
    - Demos all the main engine features
    - Builds to a zip file
*/

'use strict';

// sound effects
const sound_click = new Sound([10,0]);

// medals
const JoinMedal = new Medal(0, 'Example Medal', 'More info about the medal goes here.', '🎖️');
medalsInit('Hello World');
let MouseParticleTrailCreated = false;

// game variables
let particleEmitter;

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // create tile collision and visible tile layer
    initTileCollision(vec2(32, 16));
    const pos = vec2(2,3);
    const tileLayer = new TileLayer(pos, tileCollisionSize);
    
    // Create the main menu beta test
    CreateWorld();

    // get level data from the tiles image
    const imageLevelDataRow = 1;
    mainContext.drawImage(tileImage, 0, 0);

    tileLayer.redraw();

    // move camera to center of collision
    cameraPos = tileCollisionSize.scale(.5);

    // enable gravity
    gravity = -.01;

    // create particle emitter
    //createMouseParticleTrail();
    
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    localStorage.clear();
    JoinMedal.unlock();
    if(MouseParticleTrailCreated){
    //MouseParticleTrail();
    }
    if (mouseWasPressed(0))
    {
        // play sound when mouse is pressed
        sound_click.play(mousePos);

        // unlock medals

    }

    // move particles to mouse location if on screen
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
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

    function CreateWorld() {
        const pos = vec2(2,3);
        const Player = new EngineObject(pos);
        const JumpForce = vec2(0,-1);
        const floor = new EngineObject(vec2(15,0), vec2(100, 1));
        Player.setCollision(1, 1, 1);
        Player.elasticity = 0.2;
        //Player.gravityScale = 0;
        floor.setCollision(1, 1, 1);
        floor.gravityScale = 0;
        floor.mass = 0;
        if(mouseIsDown(0)){
            Player.applyForce(JumpForce);
        }
    }



///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, 'tiles.png');