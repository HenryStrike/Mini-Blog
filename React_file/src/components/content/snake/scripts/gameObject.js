const Game_Objects = [];

export class GameObject{
    constructor(){
        Game_Objects.push(this);
        this.time_delta = 0;
        this.has_called_start = false;
    }

    start(){
        
    }

    update(){
        
    }

    on_destroy() {

    }

    destroy(){
        this.on_destroy();

        for(let i in Game_Objects){
            const x = Game_Objects[i]; 
            if(x === this){
                Game_Objects.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestmp;
const step = (timestmp) => {
    for(let obj of Game_Objects){
        if(!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }else{
            obj.time_delta = timestmp - last_timestmp;
            obj.update();
        }
    }

    last_timestmp = timestmp;
    requestAnimationFrame(step);
};

requestAnimationFrame(step);
