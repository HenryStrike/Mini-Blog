import { GameObject } from './gameObject';
import { Cell } from './cell';

export class Snake extends GameObject{
    constructor(gamemap, ctx){
        super();
        this.game_map = gamemap;
        this.ctx = ctx;

        this.cells = [];
        this.color = "#4876EC";

        this.dirc = [
            {x:0, y:-1},
            {x:1, y:0},
            {x:0, y:1},
            {x:-1, y:0},
        ];
        this.direction = 1;
        // 判断是否相等的范围
        this.eps = 1e-1;
        // 每秒钟走几格子
        this.speed = 5;

        this.bean = new Cell(-1, -1);
        this.bean_img = new Image();
        this.bean_img.src = "http://175.178.193.39:8080/images/objects/emoji_mm.png";
        this.shit = new Cell(-1, -1);
        this.shit_img = new Image();
        this.shit_img.src = "http://175.178.193.39:8080/images/objects/emoji_shit.png";

        this.eat = false;
        // 虚拟蛇尾
        this.tail = null;
    }

    start() {
        this.cells.push(new Cell(4, 7));
        for(let i=4; i>=1; i--){
            this.cells.push(new Cell(i, 7));
        }

        this.put_mm();
        this.put_shit();
    }

    put_mm() {
        const positions = new Set();
        for(let i=0; i<17; i++){
            for(let j=0; j<15; j++){
                positions.add(`${i}-${j}`);
            }
        }

        for(let cell of this.cells){
            positions.delete(`${cell.i}-${cell.j}`);
        }

        if(this.shit.i !== -1){
            positions.delete(`${this.shit.i}-${this.shit.j}`);
        }

        const item = Array.from(positions);
        if(item.length === 0) this.game_map.win();
        else{
            let [x, y] = item[Math.floor(Math.random() * item.length)].split('-');
            x = parseInt(x);
            y = parseInt(y);
            this.bean = new Cell(x, y);
        }
    }

    put_shit() {
        const positions = new Set();
        for(let i=0; i<17; i++){
            for(let j=0; j<15; j++){
                positions.add(`${i}-${j}`);
            }
        }

        for(let cell of this.cells){
            positions.delete(`${cell.i}-${cell.j}`);
        }

        positions.delete(`${this.bean.i}-${this.bean.j}`);

        const item = Array.from(positions);
        if(item.length === 0) this.game_map.win();
        else{
            let [x, y] = item[Math.floor(Math.random() * item.length)].split('-');
            x = parseInt(x);
            y = parseInt(y);
            this.shit = new Cell(x, y);
        }
    }

    get_dirc(a, b) { // get the direction of snake
        if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
            return -1;
        if(Math.abs(a.x - b.x) < this.eps){
            if(b.y < a.y) return 0;
            return 2;
        }
        if(b.x > a.x) return 1;
        return 3;
    }

    check_die() {
        const head = this.cells[0];
        if(this.game_map.score < 0) return true;
        if(head.i < 0 || head.i >= 17 || head.j < 0 || head.j >= 15)
            return true;
        for(let i=2; i<this.cells.length; i++){
            if(head.i === this.cells[i].i && head.j === this.cells[i].j)
                return true;
        }
        return false;
    }

    update_body() { // the last and first cell move
        const k = this.cells.length - 1;
        const d = this.get_dirc(this.cells[k], this.cells[k-1]);
        if(d >= 0){
            const distance = this.speed * this.time_delta / 1000;
            this.cells[k].x += this.dirc[d].x * distance;
            this.cells[k].y += this.dirc[d].y * distance;

            this.cells[0].x += this.dirc[this.direction].x * distance;
            this.cells[0].y += this.dirc[this.direction].y * distance;
        }else{ // 蛇尾已经走到对应位置上
            const new_cells = [];
            // 新蛇头真正的位置
            const headi = this.cells[1].i + this.dirc[this.direction].x;
            const headj = this.cells[1].j + this.dirc[this.direction].y;
            new_cells.push(new Cell(headi, headj));
            new_cells.push(new Cell(headi, headj));
            for(let i=1; i<k; i++){ // 除去最后一个蛇尾
                new_cells.push(this.cells[i]);
            }
            this.cells = new_cells;

            if(this.eat){
                this.cells.push(this.tail);
                this.eat = false;
                this.tail = null;
            }
            
            const op = this.game_map.operations;
            while (op.length > 0 && (op[0] === this.direction || op[0] === (this.direction ^ 2)))
                op.splice(0, 1);
            
            if(op.length > 0){
                this.direction = op[0];
                op.splice(0, 1);
            }

            if(headi === this.bean.i && headj === this.bean.j){
                this.eat = true;
                this.game_map.updateScore(-- this.game_map.score);
                const cell = this.cells[this.cells.length - 1];
                this.tail = new Cell(cell.i, cell.j);
                this.put_mm();
            }

            if(headi === this.shit.i && headj === this.shit.j){
                this.eat = true;
                this.game_map.updateScore(++ this.game_map.score);
                const cell = this.cells[this.cells.length - 1];
                this.tail = new Cell(cell.i, cell.j);
                this.put_shit();
            }

            if(this.check_die()){
                this.game_map.lose();
            }
        }
    }

    update(){
        if(this.game_map.game_status === 'playing'){
            this.update_body();
        }
        this.render();
    }

    render() {
        const L = this.game_map.L;

        this.ctx.drawImage(this.bean_img, this.bean.i * L, this.bean.j * L, L, L);
        this.ctx.drawImage(this.shit_img, this.shit.i * L, this.shit.j * L, L, L);

        if(this.eat){
            this.cells.push(this.tail);
        }

        this.ctx.fillStyle = this.color;
        for(let obj of this.cells){
            this.ctx.beginPath();

            this.ctx.arc(obj.x * L, obj.y * L, L * 0.8 / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        for(let i=1; i<this.cells.length; i++){
            const a = this.cells[i - 1], b = this.cells[i];
            if(Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps)
                continue;
            
            if(Math.abs(a.x - b.x) < this.eps) {
                this.ctx.fillRect((a.x - 0.5 + 0.1) * L, Math.min(a.y, b.y) * L, L * 0.8,  Math.abs(a.y - b.y) * L)
            }else{
                this.ctx.fillRect(Math.min(a.x, b.x) * L, (a.y - 0.5 + 0.1 ) * L, Math.abs(a.x - b.x) * L, L * 0.8);
            }
        }

        if(this.eat){
            this.cells.pop();
        }
    }
}