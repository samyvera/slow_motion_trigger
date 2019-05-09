class Myon extends Actor {

    public owner: Player;
    public radius: number = 4;
    public posHystory: Array<Array<number>> = [];

    constructor(name: string, size: Vector2D, pos: Vector2D, owner: Player) {
        super(name, size, pos);
        this.owner = owner;
    }

    public act = (game: Game, keys: Map<string, boolean>): void  => {
        
    }
}