class Player {

    public name: string;
    public size: Vector2D;
    public pos: Vector2D;
    public direction: boolean = null;
    public speed: number = 2;
    public focus: boolean = false;
    
    public action: string = null;

    public chargeCooldown: number = 32;
    public charge: number = 0;
    
	public controls: Array<boolean> = [false, false, false, false, false, false];
	public controlsMemory: Array<boolean> = [false, false, false, false, false, false];

    constructor(name: string, size: Vector2D, pos: Vector2D) {
        this.name = name;
        this.size = size;
        this.pos = pos;
    }

    public moveX = (game: Game): void => {
        var newPos: Vector2D = new Vector2D(this.pos.x, this.pos.y);
        
        if (this.controls[2] && this.controls[3]) {
            this.controls[2] = !this.controls[2];
            this.controls[3] = !this.controls[3];
        }
		if (this.controls[2]) newPos.x -= this.speed;
        if (this.controls[3]) newPos.x += this.speed;
        
        if (!game.obstacleAt(newPos, this.size)) this.pos = newPos;
    }

    public moveY = (game: Game): void => {
        var newPos: Vector2D = new Vector2D(this.pos.x, this.pos.y);
        
        if (this.controls[4] && this.controls[5]) {
            this.controls[4] = !this.controls[4];
            this.controls[5] = !this.controls[5];
        }
        if (this.controls[4]) newPos.y -= this.speed;
        if (this.controls[5]) newPos.y += this.speed;
        
        if (!game.obstacleAt(newPos, this.size)) this.pos = newPos;
    }

    public act = (game: Game, keys: Map<string, boolean>) => {
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
            if (this.chargeCooldown > 0) this.chargeCooldown--;
            else {
                this.action = "charge";
                if (this.charge < 100) this.charge++;
            }
        }
        if (!this.controls[0] && this.controlsMemory[0]) {
            this.chargeCooldown = 32;
            if (this.action === "charge") {
                this.action = null;
                this.charge = 0;
            } 
        }

        this.moveX(game);
        this.moveY(game);

		for (let i = 0; i < this.controls.length; i++) this.controlsMemory[i] = this.controls[i];
    }
}