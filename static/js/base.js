import { GameMap } from "/static/js/game_map/base.js";
import { Kyo } from "/static/js/player/kyo.js";

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        this.game_map = new GameMap(this);

        this.Players = [
            new Kyo(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 130,
                height: 220,
                color: 'blue',
            }),
            new Kyo(this, {
                id: 1,
                x: 950,
                y: 0,
                width: 130,
                height: 220,
                color: 'green',
            })
        ];
    }
}

export {
    KOF
}