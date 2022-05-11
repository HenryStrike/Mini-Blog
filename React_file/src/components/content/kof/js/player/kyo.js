import { Player } from "../player/base.js"
import { GIF } from "../utils/gif.js"

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        // initialize the HP
        this.maxHP = 50000;
        this.HP = this.maxHP;

        // initialize the damage
        this.general_attack_damage = 3000;
        this.special_attack_damage = 15000;

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets_y = [0, -22, -22, -130, 0, 0, 0, -200]; // offset for each status

        for (let i = 0; i < 8; i++) {
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);

            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, // total number of frames in a gif
                frame_rate: 4, // number of rendering images per sec
                offset_y: offsets_y[i], //image position offset
                loaded: false, // whether it is loaded
                scale: 2.2,
            })

            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length; //update total number of frames
                obj.loaded = true;

                if(i===3){
                    obj.frame_rate = 4;
                }
            }
        }
    }
}