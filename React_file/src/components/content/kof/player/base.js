import { GameObject } from "../game_object/base.js";
import { is_collision } from "../utils/collision.js";

export class Player extends GameObject {
    constructor(root, info) {
        super();

        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        // initial velocity
        this.vx = 0;
        this.vy = 0;
        this.direction = 1; // player direction

        this.speedx = 400; // jump horizontal move speed
        this.speedy = 900; // jump initial vertical speed

        this.gravity = 50;

        this.root = root;
        this.$canvas = root.game_map.$canvas;
        this.ctx = this.root.game_map.ctx;

        this.general_attack_damage = 0;
        this.special_attack_damage = 0;

        this.maxHP = 10000;
        this.HP = 10000;
        this.$hp = this.root.$kof.find(`.kof-head>.kof-head-hp-p${this.id}>div`);
        this.$hp_inner = this.$hp.find(`div`);

        this.ground = 450;
        this.leftwall = 0;
        this.rightwall = this.root.game_map.ctx.canvas.width - this.width;

        // 0 as idle, 1 as walk ahead, 2 as walk back, 
        // 3 as jump, 4 as attack, 5 as hurt, 6 as death
        this.status = 3; // initial status above the ground; 
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.animations = new Map();
        this.total_frame_cnt = 0;
    }

    start() {

    }

    reduce_HP(damage) {
        if (this.status === 6) return;
        this.status = 5;
        this.total_frame_cnt = 0;
        this.HP -= damage;
        this.HP = Math.max(this.HP, 0);
        if (this.HP === 0) {
            this.status = 6;
            this.total_frame_cnt = 0;
            this.vx = 0;
            this.root.game_map.winner = true;
        }
        // hp bar style
        this.update_hp_bar();
    }

    update_hp_bar() {
        this.$hp_inner.animate({
            width: this.$hp.parent().width() * this.HP / this.maxHP
        }, 300);
        this.$hp.animate({
            width: this.$hp.parent().width() * this.HP / this.maxHP
        }, 700);
    }

    update_direction() { // update direction of players, always meet each other
        let players = this.root.Players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x > you.x) {
                me.direction = -1;
            } else {
                me.direction = 1;
            }
        }
    }

    update_control() {
        let w, a, d, q, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            q = this.pressed_keys.has('q');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            q = this.pressed_keys.has('Shift');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1 || this.status === 2) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.total_frame_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                }
                else {
                    this.vx = 0;
                }
                this.vy = -this.speedy;
                this.status = 3;
                this.total_frame_cnt = 0;
            } else if (q) { // special damage
                this.status = 7;
                this.vx = 0;
                this.total_frame_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.vy = 0;
                this.status = 0;
            }
        }
    }

    update_move() {
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > this.ground) { // whether player at groud position
            this.y = this.ground;
            this.vy = 0;
            if (this.status === 3) {
                this.status = 0;
            }
        }

        if (this.x > this.rightwall) this.x = this.rightwall;
        if (this.x < this.leftwall) this.x = this.leftwall;
    }

    update_general_attack() {
        if (this.status === 4 && this.total_frame_cnt === 18) {
            let me = this, you = this.root.Players[1 - this.id];
            let r1, r2; // two boxes

            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 130,
                    y1: me.y + 40,
                    x2: me.x + 130 + 120,
                    y2: me.y + 40 + 20,
                }
            } else {
                r1 = {
                    x1: me.x - 120,
                    y1: me.y + 40,
                    x2: me.x - 120 + 120,
                    y2: me.y + 40 + 20,
                }
            }

            r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            }

            if (is_collision(r1, r2)) {
                you.reduce_HP(this.general_attack_damage);
            }
        }
    }

    update_special_attack() {
        if (this.status === 7 && this.total_frame_cnt === 15) {
            let me = this, you = this.root.Players[1 - this.id];
            let r1, r2; // two boxes

            if (this.direction > 0) {
                r1 = {
                    x1: me.x + 50,
                    y1: me.y - 50,
                    x2: me.x + 50 + 180,
                    y2: me.y - 50 + 150,
                }
            } else {
                r1 = {
                    x1: me.x - 100,
                    y1: me.y - 50,
                    x2: me.x - 100 + 180,
                    y2: me.y - 50 + 150,
                }
            }

            r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            }

            if (is_collision(r1, r2)) {
                you.reduce_HP(this.special_attack_damage);
            }
        }
    }

    update() {
        if (!this.root.game_map.winner) {
            this.update_control();
        }

        if (this.status !== 6) {
            this.update_direction();
        }
        this.update_move();
        this.update_general_attack();
        this.update_special_attack();

        this.render();
    }

    render() {
        if (this.status === 1 && this.direction * this.vx < 0) {
            this.status = 2;
        } // justify the direction

        let obj = this.animations.get(this.status); // get frames by status
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                let k = parseInt((this.total_frame_cnt / obj.frame_rate) % obj.frame_cnt); // render which frame
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, obj.scale * image.width, obj.scale * image.height);
            } else {
                let k = parseInt((this.total_frame_cnt / obj.frame_rate) % obj.frame_cnt);
                let image = obj.gif.frames[k].image;

                // transform the coordinate axis system
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.$canvas.width(), 0);
                let new_x = this.$canvas.width() - this.x - this.width;
                this.ctx.drawImage(image, new_x, this.y + obj.offset_y, obj.scale * image.width, obj.scale * image.height);
                this.ctx.restore();
            }
            // player indicator
            this.ctx.fillStyle = 'orange';
            this.ctx.font = "48px sans-serif";
            this.ctx.fillText(`P${this.id + 1}`, this.x + this.width / 3, this.y + obj.offset_y);
        }

        if ((this.status === 4 || this.status === 5 || this.status === 6 || this.status === 7) && parseInt(this.total_frame_cnt / obj.frame_rate) === obj.frame_cnt - 1) {
            if (this.status === 7) this.x += 100 * this.direction;
            if (this.status === 6) {
                this.total_frame_cnt--;
            } else {
                this.status = 0;
            }
        }

        // game over
        if(this.root.game_map.time_left === 0 && !this.root.game_map.winner){
            this.vx = 0;
            this.status = 0;
        }else if(this.root.game_map.winner){
            this.vx = 0;
        }

        this.total_frame_cnt++;
    }
}