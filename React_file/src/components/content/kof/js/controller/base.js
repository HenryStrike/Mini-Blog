export class Controller{
    constructor($canvas){
        this.$canvas = $canvas;

        this.pressed_keys = new Set();
        this.start();
    }

    start(){
        let outer = this; // this cannot be used inside a function
        this.$canvas.keydown(function(event){
            outer.pressed_keys.add(event.key);
        });

        this.$canvas.keyup(function(event){
            outer.pressed_keys.delete(event.key);
        });
    }
}