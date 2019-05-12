class Myon extends Actor {

    public owner: Player;
    public radius: number = 4;
    public posHystory: Array<Array<number>> = [];

    public animationTime: number = 0;
    public animationKey: number = 0;
    public stepModifier: number = 1;

    constructor(name: string, size: Vector2D, pos: Vector2D, owner: Player) {
        super(name, size, pos);
        this.owner = owner;
    }

    public act = (game: Game, keys: Map<string, boolean>): void  => {
        var Xamplitude = Math.sin(this.animationTime * 0.01) * 32;
        this.pos.x = this.owner.pos.x + this.owner.size.x / 2 + Math.cos(this.animationTime * 0.1) * Xamplitude;

        var Yamplitude = Math.cos(this.animationTime * 0.01) * 32;
        this.pos.y = this.owner.pos.y + this.owner.size.y / 2 + Math.sin(this.animationTime * 0.1) * Yamplitude;

		if (this.posHystory.length > 10) this.posHystory.splice(0, 1);
        this.posHystory.push([this.pos.x, this.pos.y]);
        
		this.animationTime += game.step * this.stepModifier;
    }
}