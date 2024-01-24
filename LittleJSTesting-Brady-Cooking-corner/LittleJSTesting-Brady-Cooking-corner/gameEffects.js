'use strit';

//sound effects

const sound_die =          new Sound([.5,.4,126,.05,,.2,1,2.09,,-4,,,1,1,1,.4,.03]);
const sound_jump =         new Sound([.4,.2,250,.04,,.04,,,1,,,,,3]);
const sound_walk =         new Sound([.3,.1,70,,,.01,4,,,,-9,.1,,,,,,.5]);
const sound_killEnemy =    new Sound([,,783,,.03,.02,1,2,,,940,.03,,,,,.2,.6,,.06]);





let skySeed, skyColor, horizonColor;

function initSky()
{
    skySeed = rand(1e9);
    skyColor = randColor(new Color(.5,.5,.5), new Color(.9,.9,.9));
    horizonColor = skyColor.subtract(new Color(.05,.05,.05)).mutate(.3).clamp();
}

function drawSky()
{
    // fill background with a gradient
    const gradient = mainContext.fillStyle = mainContext.createLinearGradient(0, 0, 0, mainCanvas.height);
    gradient.addColorStop(0, skyColor);
    gradient.addColorStop(1, horizonColor);
    mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
}

function drawStars()
{
    // draw stars and planets
    const random = new RandomGenerator;
    random.seed = skySeed;
    const largeStarCount = 9;
    for (let i = 1e3; i--;)
    {
        let size = random.float(6, 1);
        let speed = random.float() < .9 ? random.float(5) : random.float(99,9);
        let color = (new Color).setHSLA(random.float(.2,-.3), random.float()**9, random.float(1,.5), random.float(.9,.3));
        if (i < largeStarCount)
        {
            // large planets and suns
            size = random.float()**3*99 + 9;
            speed = random.float(5);
            color = (new Color).setHSLA(random.float(), random.float(), random.float(1,.5)).add(skyColor.scale(.5)).clamp();
        }
        
        const extraSpace = 200;
        const w = mainCanvas.width+2*extraSpace, h = mainCanvas.height+2*extraSpace;
        const screenPos = vec2(
            (random.float(w)+time*speed)%w-extraSpace,
            (random.float(h)+time*speed*random.float())%h-extraSpace);

        mainContext.fillStyle = color;
        if (size < 9)
            mainContext.fillRect(screenPos.x, screenPos.y, size, size);
        else
            mainContext.beginPath(mainContext.fill(mainContext.arc(screenPos.x, screenPos.y, size, 0, 9)));
    }
}
