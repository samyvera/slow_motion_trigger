class Game {
    constructor() {
        this.frame = 0;
        this.relativeFrame = 0;
        this.step = 1;
        this.size = new Vector2D(256, 128);
        this.update = (keys) => {
            this.player.act(this, keys);
            this.relativeFrame += this.step;
            this.frame++;
        };
        this.obstacleAt = (pos, size) => pos.x < 0 || pos.x + size.x > this.size.x || pos.y < 0 || pos.y + size.y > this.size.y;
        this.player = new Player("Youmu Konpaku", new Vector2D(12, 12), new Vector2D(this.size.x / 2 - 6, this.size.y / 2 - 6));
        this.player.myon = new Myon("Myon", new Vector2D(6, 6), new Vector2D(this.player.pos.x + 3, this.player.pos.y + 3), this.player);
    }
}
