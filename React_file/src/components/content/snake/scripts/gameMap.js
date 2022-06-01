import { GameObject } from "./gameObject";
import { Snake } from "./snake";

export class GameMap extends GameObject{
    constructor(ctx, root, update_score, restart_update){
        super();
        this.ctx = ctx;
        this.root = root;
        this.L = 0;

        this.snake = new Snake(this, this.ctx);
        this.operations = [];
        this.game_status = 'waiting'; // playing, win, lose

        this.score = 0;
        this.updateScore = update_score;
        this.updateRestart = restart_update;
    }

    start() {
        this.ctx.canvas.focus();

        this.ctx.canvas.addEventListener('keydown', e=>{
            if(e.key === 'w' || e.key === 'ArrowUp'){
                this.operations.push(0);
                e.preventDefault();
            }else if(e.key === 's' || e.key === 'ArrowDown'){
                this.operations.push(2);
                e.preventDefault();
            }else if(e.key === 'a' || e.key === 'ArrowLeft'){
                this.operations.push(3);
                e.preventDefault();
            }else if(e.key === 'd' || e.key === 'ArrowRight'){
                this.operations.push(1);
                e.preventDefault();
            }

            let k = this.operations.length;
            if(k > 1 && this.operations[k - 1] === this.operations[k - 2])
                this.operations.pop();
            
            while(this.operations.length > 2){
                this.operations.splice(0, 1); // 取消早的操作
            }

            if(this.game_status === 'waiting' && this.operations.length > 0 && this.operations[0] !== 3){
                this.game_status = 'playing';
                this.snake.direction = this.operations[0];
            }
        });

    }

    update_window(){
        this.L = Math.min(this.root.clientWidth / 17, this.root.clientHeight / 15)  * 0.9;
        this.ctx.canvas.width = this.L * 17;
        this.ctx.canvas.height = this.L * 15;
    }

    win() {
        this.snake.color = 'gold';
        this.game_status = 'win';
        this.updateRestart(true);
    }

    lose() {
        this.snake.color = 'white';
        this.game_status = 'lose';
        this.updateRestart(true);
    }

    restart() {
        this.score = 0;
        this.updateScore(this.score);
        this.game_status = "waiting";
        this.snake.destroy();
        this.snake = new Snake(this, this.ctx);
        this.ctx.canvas.focus();
    }

    update() {
        this.update_window();
        this.render();
    }

    render() {
        let color_even = '#A2D149';
        for(let i=0; i<17; i++){
            for(let j=0; j<15; j++){
                if((i + j) % 2 === 0){
                    this.ctx.fillStyle = color_even;
                    this.ctx.fillRect(i * this.L, j * this.L, this.L, this.L);
                }
            }
        }
    }
}