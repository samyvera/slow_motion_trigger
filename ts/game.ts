class Game {

    public size: Vector2D = new Vector2D(256, 128);
    public player: Player = new Player("Youmu Konpaku", new Vector2D(12, 12), new Vector2D(this.size.x / 2, this.size.y / 2));

    public update = (keys: Map<string, boolean>) => {
        this.player.act(this, keys);
    }

    public obstacleAt = (pos: Vector2D, size: Vector2D): boolean => pos.x < 0 || pos.x + size.x > this.size.x || pos.y < 0 || pos.y + size.y > this.size.y;
}