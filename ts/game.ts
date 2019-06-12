class Game {

    public frame: number = 0;
    public relativeFrame: number = 0;
    public step: number = 1;

    public size: Vector2D = new Vector2D(256, 256);
    public player: Player;

    constructor() {
        this.player = new Player("Youmu Konpaku", new Vector2D(12, 12), new Vector2D(this.size.x / 2 - 6, this.size.y / 2 - 6));
        this.player.myon = new Myon("Myon", new Vector2D(6, 6), new Vector2D(this.player.pos.x + 3, this.player.pos.y + 3), this.player);
    }

    public update = (keys: Map<string, boolean>) => {
        this.player.act(this, keys);
        this.relativeFrame += this.step;
        this.frame++;
    }

    public obstacleAt = (pos: Vector2D, size: Vector2D): boolean => pos.x < 0 || pos.x + size.x > this.size.x || pos.y < 0 || pos.y + size.y > this.size.y;
}