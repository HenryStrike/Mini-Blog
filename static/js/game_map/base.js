import { GameObject } from "/static/js/game_object/base.js";
import { Controller } from "/static/js/controller/base.js";


export class GameMap extends GameObject {
    constructor(root) { // root is the generate class of game_map, which is kof
        super();

        this.root = root; //create a root reference
        this.$canvas = $('<canvas width="1280" height="720" tabindex="0"></canvas>');
        this.ctx = this.$canvas[0].getContext('2d'); //jquery canvas is an array
        this.root.$kof.append(this.$canvas); //add map to div
        this.$canvas.focus(); // can be input by keyboard

        this.controller = new Controller(this.$canvas); // keyboard input

        // generate HP tag
        this.root.$kof.append($(`
        <div class="kof-head">
            <div class="kof-head-hp-p0">
                <div><div></div></div>
            </div>
            <div class="kof-head-timer">60</div>
            <div class="kof-head-hp-p1">
                <div><div></div></div>
            </div>
        </div>
        <div class="kof-body">
            <div class="kof-body-KO">
                K.O.
            </div>
        </div>
        `));

        // initialize timer
        this.time_left = 5000;
        this.$timer = this.root.$kof.find(`.kof-head>.kof-head-timer`);

        // end of game?
        this.winner = false;
    }

    start() {

    }

    update() {
        if(!this.winner){
            this.time_left -= this.timedelta;
        }
        this.time_left = Math.max(this.time_left, 0);
        this.$timer.text(parseInt(this.time_left / 1000));
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}




