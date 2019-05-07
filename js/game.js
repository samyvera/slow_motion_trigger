class Game {
    constructor() {
        this.size = new Vector2D(256, 128);
        this.player = new Player("Youmu Konpaku", new Vector2D(12, 12), new Vector2D(this.size.x / 2, this.size.y / 2));
        this.update = (keys) => {
            this.player.act(this, keys);
        };
        this.obstacleAt = (pos, size) => pos.x < 0 || pos.x + size.x > this.size.x || pos.y < 0 || pos.y + size.y > this.size.y;
    }
}
