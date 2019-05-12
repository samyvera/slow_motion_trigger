class Myon extends Actor {
    constructor(name, size, pos, owner) {
        super(name, size, pos);
        this.radius = 4;
        this.posHystory = [];
        this.animationTime = 0;
        this.animationKey = 0;
        this.stepModifier = 1;
        this.act = (game, keys) => {
            var Xamplitude = Math.sin(this.animationTime * 0.01) * 32;
            this.pos.x = this.owner.pos.x + this.owner.size.x / 2 + Math.cos(this.animationTime * 0.1) * Xamplitude;
            var Yamplitude = Math.cos(this.animationTime * 0.01) * 32;
            this.pos.y = this.owner.pos.y + this.owner.size.y / 2 + Math.sin(this.animationTime * 0.1) * Yamplitude;
            if (this.posHystory.length > 10)
                this.posHystory.splice(0, 1);
            this.posHystory.push([this.pos.x, this.pos.y]);
            this.animationTime += game.step * this.stepModifier;
        };
        this.owner = owner;
    }
}
