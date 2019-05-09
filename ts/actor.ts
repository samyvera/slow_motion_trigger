class Actor {

    public name: string;
    public size: Vector2D;
    public pos: Vector2D;
    
    constructor(name: string, size: Vector2D, pos: Vector2D) {
        this.name = name;
        this.size = size;
        this.pos = pos;
    }

    public act = (game: Game, keys: Map<string, boolean>): void => {}
}