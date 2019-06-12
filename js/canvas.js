class Canvas {
    constructor(game, parent, zoom) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d", { alpha: false });
        this.lastTime = null;
        this.drawFrame = (time, zoom) => {
            this.drawBackground();
            this.drawPlayer(this.game.player);
            if (this.lastTime)
                this.hud(time);
            this.lastTime = time;
            this.animationTime = this.game.relativeFrame;
            if (zoom !== this.zoom) {
                this.zoom = zoom;
                this.canvas.width = this.game.size.x * this.zoom;
                this.canvas.height = this.game.size.y * this.zoom;
                this.cx.scale(this.zoom, this.zoom);
                this.cx.imageSmoothingEnabled = false;
            }
        };
        this.hud = (time) => {
            var player = this.game.player;
            var fps = Math.round((time - this.lastTime) / 1000 * 3600) + "FPS";
            this.cx.fillStyle = "#fff";
            this.cx.textAlign = "right";
            this.cx.font = "16px rcr";
            this.cx.fillText(fps, this.game.size.x, 8);
            this.cx.fillText(Math.floor(this.game.relativeFrame) + "RF", this.game.size.x, 16);
            this.cx.fillText(this.game.frame + "AF", this.game.size.x, 24);
            this.cx.textAlign = "left";
            this.cx.fillText(player.name, 4, 12);
            if (player.charge) {
                for (let i = 0; i < 100; i++) {
                    if (i <= player.charge)
                        player.charge === 100 && player.animationTime % 2 === 0 ? this.cx.fillStyle = "#000" : this.cx.fillStyle = "#fff";
                    else
                        this.cx.fillStyle = "#000";
                    this.cx.fillRect(4 + i, 16, 1, 2);
                }
            }
        };
        this.drawBackground = () => {
            // this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.cx.fillStyle = "#000";
            this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            if (this.game.player && this.game.player.controls[1]) {
                this.drawSakura();
            }
        };
        this.drawSakura = () => {
            var sakura = document.createElement("img");
            sakura.src = "img/sakura.png";
            this.cx.globalAlpha = this.game.player.charge / 100;
            this.cx.translate(this.game.size.x / 2, this.game.size.y / 2);
            this.cx.rotate(-(this.animationTime * 2 % 360 * Math.PI / 180));
            this.cx.drawImage(sakura, 0, 0, 512, 512, -256, -256, 512, 512);
            this.cx.rotate(this.animationTime * 2 % 360 * Math.PI / 180);
            this.cx.translate(-this.game.size.x / 2, -this.game.size.y / 2);
            this.cx.globalAlpha = 1;
        };
        this.drawMagic = (posX, posY) => {
            var magic = document.createElement("img");
            magic.src = "img/magic.png";
            var magic2 = document.createElement("img");
            magic2.src = "img/magic2.png";
            this.cx.translate(posX, posY);
            this.cx.rotate(this.animationTime * 2 % 360 * Math.PI / 180);
            this.cx.drawImage(magic, 0, 0, 64, 64, -32, -32, 64, 64);
            this.cx.rotate(-(this.animationTime * 2 % 360 * Math.PI / 180));
            this.cx.rotate(-(this.animationTime % 360 * Math.PI / 180));
            this.cx.drawImage(magic2, 0, 0, 64, 64, -32, -32, 64, 64);
            this.cx.rotate(this.animationTime % 360 * Math.PI / 180);
            this.cx.translate(-posX, -posY);
        };
        this.drawPlayerShadow = (spriteX, width, height, centerX, centerY) => {
            var shadow = document.createElement("img");
            shadow.src = "img/youmu.png";
            var amplitude = Math.floor(Math.sin(this.game.player.animationTime * 0.1) * 2) + 2;
            this.cx.drawImage(shadow, spriteX * width, 3 * height, width, height, centerX - width / 2 - amplitude, centerY - height / 2 - amplitude / 2, width + amplitude * 2, height + amplitude);
        };
        this.drawMyon = (myon) => {
            var size = myon.radius;
            this.cx.fillStyle = "#fff";
            this.cx.beginPath();
            this.cx.arc(myon.pos.x, myon.pos.y, size, 0, 2 * Math.PI);
            this.cx.fill();
            myon.posHystory.forEach((myonPart, i) => {
                this.cx.beginPath();
                this.cx.arc(myonPart[0], myonPart[1], size - (10 - i) / 10 * size, 0, 2 * Math.PI);
                this.cx.fill();
            });
        };
        this.drawPlayer = (player) => {
            var width = 64;
            var height = 32;
            var posX = player.pos.x;
            var posY = player.pos.y;
            var centerX = posX + player.size.x / 2;
            var centerY = posY + player.size.y / 2;
            var spriteY = 0;
            if (player.controls[1]) {
                if (player.animationKey < 8 * this.game.step * player.stepModifier) {
                    spriteY = 1;
                    if (player.animationKey === 0)
                        player.animationTime = 0;
                    player.animationKey += 1 / 4 * this.game.step * player.stepModifier;
                }
                else
                    spriteY = 2;
            }
            else
                player.animationKey = 0;
            var spriteX = Math.floor(player.animationTime / 8) % 4;
            var sprites = document.createElement("img");
            sprites.src = "img/youmu.png";
            this.drawMagic(centerX, centerY);
            if (player.myon && Math.sin(player.myon.animationTime * 0.1) >= 0)
                this.drawMyon(player.myon);
            if (player.charge)
                this.drawPlayerShadow(spriteX, width, height, centerX, centerY);
            this.cx.drawImage(sprites, spriteX * width, spriteY * height, width, height, centerX - width / 2, centerY - height / 2, width, height);
            if (player.myon && Math.sin(player.myon.animationTime * 0.1) < 0)
                this.drawMyon(player.myon);
            if (player.focus) {
                this.cx.fillStyle = "#f008";
                this.cx.fillRect(posX, posY, player.size.x, player.size.y);
            }
        };
        this.zoom = zoom;
        this.game = game;
        this.animationTime = this.game.relativeFrame;
        this.canvas.width = this.game.size.x * this.zoom;
        this.canvas.height = this.game.size.y * this.zoom;
        parent.appendChild(this.canvas);
        this.cx.scale(this.zoom, this.zoom);
        this.cx.imageSmoothingEnabled = false;
    }
}
