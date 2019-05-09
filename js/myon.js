class Myon extends Actor {
    constructor(name, size, pos, owner) {
        super(name, size, pos);
        this.radius = 4;
        this.posHystory = [];
        this.act = (game, keys) => {
        };
        this.owner = owner;
    }
}
