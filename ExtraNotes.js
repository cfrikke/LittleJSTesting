class Character extends Gameobject
{
    construtor(pos)
    {
        //super(pos, vec2(.6,.95), 32);
        this.lasePos = pos;
        this.groundTimer = new Timer;
        this.jumpTimer = new Timer;
        this.pressedJumpTimer = new Timer;
        this.deadTimer = new Timer;
        this.renderOrder = 10;
        this.drawSize = vec2(1);
        this.walkCyclePercent = 0;
        //this.health = 1;
        this.moveInput = 0;
        this.setCollision(1,0);
    }

    update()
    {
        this.gravityScale = 1; // reset to default gravity

        //if(this.isDead())
        //    return super.update();
        // jump
        if (!this.holdingJump)
            this.pressedJumpTimer.unset();
        else if (!this.wasHoldingJump)
            this.pressedJumpTimer.set(.3);
        this.wasHoldingJump = this.holdingJump;
    }
}
///////////////////////////////////////////////////////////////////////////////

class Player extends Character
{
    update() 
    {
        // player controls
        this.holdingJump   = keyIsDown(38) || gamepadIsDown(0);
        this.holdingShoot  = !isUsingGamepad && mouseIsDown(0) || keyIsDown(90) || gamepadIsDown(2);
        this.pressingThrow = mouseIsDown(1) || keyIsDown(67) || gamepadIsDown(1);
        this.pressedDodge  = mouseIsDown(2) || keyIsDown(88) || gamepadIsDown(3);

        // movement control
        this.moveInput = isUsingGamepad ? gamepadStick(0) : 
            vec2(keyIsDown(39) - keyIsDown(37), keyIsDown(38) - keyIsDown(40));

        super.update();
    }

    kill()
    {
        ++deaths;
        super.kill();
    }
}