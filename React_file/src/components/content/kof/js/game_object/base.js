let GAME_OBJECTS = []; // records objects refreshing 60 times per second

class GameObject { // game object
    constructor() {
        GAME_OBJECTS.push(this);

        this.timedelta = 0; //the change of time
        this.has_call_start = false; // whether it is started
    }

    start() { //initialize

    }

    update() { // run each frame to update information

    }

    destroy() { //detele
        for (let i in GAME_OBJECTS) {
            if (GAME_OBJECTS === this) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp = 0;
let GAME_OBJECTS_FRAME = (timestamp) => {
    for (let obj of GAME_OBJECTS) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(GAME_OBJECTS_FRAME); //recursive to run the animation
}

requestAnimationFrame(GAME_OBJECTS_FRAME);

export{
    GameObject
}

