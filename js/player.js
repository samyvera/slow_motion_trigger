class Player extends Actor {
    constructor(name, size, pos) {
        super(name, size, pos);
        this.direction = null;
        this.speed = 2;
        this.focus = false;
        this.action = null;
        this.chargeCooldown = 32;
        this.chargeSpeed = 1;
        this.charge = 0;
        this.chargeMax = false;
        this.controls = [false, false, false, false, false, false];
        this.controlsMemory = [false, false, false, false, false, false];
        this.visibilityRadius = 50;
        this.animationTime = 0;
        this.animationKey = 0;
        this.stepModifier = 1;
        this.moveX = (game) => {
            var newPos = new Vector2D(this.pos.x, this.pos.y);
            if (this.controls[2] && this.controls[3]) {
                this.controls[2] = !this.controls[2];
                this.controls[3] = !this.controls[3];
            }
            if (this.controls[2])
                newPos.x -= this.speed * game.step * this.stepModifier;
            if (this.controls[3])
                newPos.x += this.speed * game.step * this.stepModifier;
            if (!game.obstacleAt(newPos, this.size))
                this.pos = newPos;
        };
        this.moveY = (game) => {
            var newPos = new Vector2D(this.pos.x, this.pos.y);
            if (this.controls[4] && this.controls[5]) {
                this.controls[4] = !this.controls[4];
                this.controls[5] = !this.controls[5];
            }
            if (this.controls[4])
                newPos.y -= this.speed * game.step * this.stepModifier;
            if (this.controls[5])
                newPos.y += this.speed * game.step * this.stepModifier;
            if (!game.obstacleAt(newPos, this.size))
                this.pos = newPos;
        };
        this.act = (game, keys) => {
            this.controls = [
                keys.get("shoot"),
                keys.get("bomb"),
                keys.get("left"),
                keys.get("right"),
                keys.get("up"),
                keys.get("down"),
                keys.get("focus")
            ];
            if (this.controls[6] && !this.controlsMemory[6]) {
                this.focus = !this.focus;
                this.speed /= 2;
            }
            if (!this.controls[6] && this.controlsMemory[6]) {
                this.focus = !this.focus;
                this.speed *= 2;
            }
            if (this.controls[0] && this.controlsMemory[0]) {
                if (this.chargeCooldown > 0)
                    this.chargeCooldown--;
                else {
                    this.action = "charge";
                    if (this.charge < 100)
                        this.charge += this.chargeSpeed * game.step * this.stepModifier;
                    else if (!this.chargeMax) {
                        this.chargeMax = true;
                        game.step /= 2;
                        this.stepModifier *= 2;
                        this.animationKey *= 2;
                    }
                }
            }
            if (!this.controls[0] && this.controlsMemory[0]) {
                this.chargeCooldown = 32;
                if (this.action === "charge") {
                    this.action = null;
                    this.charge = 0;
                    if (this.chargeMax) {
                        this.chargeMax = false;
                        game.step *= 2;
                        this.stepModifier /= 2;
                        this.animationKey /= 2;
                    }
                }
            }
            this.moveX(game);
            this.moveY(game);
            for (let i = 0; i < this.controls.length; i++)
                this.controlsMemory[i] = this.controls[i];
            this.animationTime += game.step * this.stepModifier;
        };
    }
}
