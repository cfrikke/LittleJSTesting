/*
    LittleJS Platformer Example - Objects
    - Base GameObject class for objects with health
    - Crate object collides with player, can be destroyed.
    - Weapon is held by player and fires bullets with some settings.
    - Bullet is the projectile launched by a weapon.
*/

'use strict';

class GameObject extends EngineObject 
{
    constructor(pos, size, tileIndex, tileSize, angle)
    {
        super(pos, size, tileIndex, tileSize, angle);
        this.health = 0;
        this.isGameObject = 1;
        this.damageTimer = new Timer;
    }

    update()
    {
        super.update();

        // flash white when damaged
        if (!this.isDead() && this.damageTimer.isSet())
        {
            const a = .5*percent(this.damageTimer, .15, 0);
            this.additiveColor = new Color(a,a,a,0);
        }
        else
            this.additiveColor = new Color(0,0,0,0);

        // kill if below level
        if (!this.isDead() && this.pos.y < -9)
            warmup ? this.destroy() : this.kill();
    }

    damage(damage, damagingObject)
    {
        ASSERT(damage >= 0);
        if (this.isDead())
            return 0;
        
        // set damage timer;
        this.damageTimer.set();
        for (const child of this.children)
            child.damageTimer && child.damageTimer.set();

        // apply damage and kill if necessary
        const newHealth = max(this.health - damage, 0);
        if (!newHealth)
            this.kill(damagingObject);

        // set new health and return amount damaged
        return this.health - (this.health = newHealth);
    }

    isDead()                { return !this.health; }
    kill(damagingObject)    { this.destroy(); }
}

///////////////////////////////////////////////////////////////////////////////

class Crate extends GameObject 
{
    constructor(pos) 
    { 
        super(pos, vec2(1), 2, vec2(16), (randInt(4))*PI/2);

        this.color = (new Color).setHSLA(rand(),1,.8);
        this.health = 5;

        // make it a solid object for collision
        this.setCollision();
    }

    kill()
    {
        if (this.isDestroyed)
            return;

        sound_destroyObject.play(this.pos);
        makeDebris(this.pos, this.color);
        this.destroy();
    }
}

///////////////////////////////////////////////////////////////////////////////

class Enemy extends GameObject 
{
    constructor(pos) 
    { 
        super(pos, vec2(.9,.9), 8, vec2(16));

        this.drawSize = vec2(1);
        this.color = (new Color).setHSLA(rand(), 1, .7);
        this.health = 5;
        this.bounceTime = new Timer(rand(1e3));
        this.setCollision(1,0);
    }

    update()
    {
        super.update();
        
        if (!player)
            return;

        // jump around randomly
        if (this.groundObject && rand() < .01 && this.pos.distance(player.pos) < 20)
        {
            this.velocity = vec2(rand(.1,-.1), rand(.4,.2));
            sound_jump.play(this.pos);
        }

        // damage player if touching
        if (isOverlapping(this.pos, this.size, player.pos, player.size))
            player.damage(1, this);
    }

    kill()
    {
        if (this.isDestroyed)
            return;

        ++score;
        sound_killEnemy.play(this.pos);
        makeDebris(this.pos, this.color, 300);
        this.destroy();
    }
       
    render()
    {
        // bounce by changing size
        const bounceTime = this.bounceTime*6;
        this.drawSize = vec2(1-.1*Math.sin(bounceTime), 1+.1*Math.sin(bounceTime));

        // make bottom flush
        let bodyPos = this.pos;
        bodyPos = bodyPos.add(vec2(0,(this.drawSize.y-this.size.y)/2));
        drawTile(bodyPos, this.drawSize, this.tileIndex, this.tileSize, this.color, this.angle, this.mirror, this.additiveColor);
    }
}