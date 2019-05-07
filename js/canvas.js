class Canvas {
    constructor(game, parent, zoom) {
        this.canvas = document.createElement('canvas');
        this.cx = this.canvas.getContext("2d", { alpha: false });
        this.lastTime = null;
        this.animationTime = 0;
        this.myonHystory = [];
        this.myonAnimationTime = 0;
        this.playerAnimationKey = 0;
        this.playerAnimationTime = 0;
        this.drawFrame = (time, zoom) => {
            this.drawBackgorund();
            this.drawPlayer(this.game.player);
            if (this.lastTime)
                this.hud(time);
            this.lastTime = time;
            this.animationTime++;
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
            this.cx.textAlign = "left";
            this.cx.fillText(player.name, 4, 12);
            if (player.charge) {
                for (let i = 0; i < 100; i++) {
                    if (i <= player.charge)
                        player.charge === 100 && this.animationTime % 2 === 0 ? this.cx.fillStyle = "#000" : this.cx.fillStyle = "#fff";
                    else
                        this.cx.fillStyle = "#000";
                    this.cx.fillRect(4 + i, 16, 1, 2);
                }
            }
        };
        this.drawBackgorund = () => {
            var gradient = this.cx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, '#224');
            gradient.addColorStop(1, '#88f');
            this.cx.fillStyle = gradient;
            this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
            var amplitude = Math.floor(Math.sin(this.animationTime * 0.1) * 2) + 2;
            this.cx.drawImage(shadow, spriteX * width, 3 * height, width, height, centerX - width / 2 - amplitude, centerY - height / 2 - amplitude / 2, width + amplitude * 2, height + amplitude);
        };
        this.drawMyon = (youmuX, youmuY) => {
            var Xperiod = 0.1;
            var Xamplitude = Math.sin(this.animationTime * 0.01) * 32;
            this.cx.fillStyle = "#fff";
            this.cx.textAlign = "left";
            this.cx.font = "16px rcr";
            var myonX = youmuX + Math.cos(this.myonAnimationTime * Xperiod) * Xamplitude;
            var Yperiod = 0.1;
            var Yamplitude = Math.cos(this.animationTime * 0.01) * 32;
            var myonY = youmuY + Math.sin(this.myonAnimationTime * Yperiod) * Yamplitude;
            var size = 4;
            this.cx.fillStyle = "#fff";
            this.cx.beginPath();
            this.cx.arc(myonX, myonY, size, 0, 2 * Math.PI);
            this.cx.fill();
            if (this.myonHystory.length > 10)
                this.myonHystory.splice(0, 1);
            this.myonHystory.push([myonX, myonY]);
            this.myonHystory.forEach((myon, i) => {
                this.cx.beginPath();
                this.cx.arc(myon[0], myon[1], size - (10 - i) / 10 * size, 0, 2 * Math.PI);
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
            if (player.controls[0]) {
                if (this.playerAnimationKey < 8) {
                    spriteY = 1;
                    if (this.playerAnimationKey === 0)
                        this.playerAnimationTime = 0;
                    this.playerAnimationKey += 1 / 4;
                }
                else
                    spriteY = 2;
            }
            else
                this.playerAnimationKey = 0;
            var spriteX = Math.floor(this.playerAnimationTime / 8) % 4;
            var sprites = document.createElement("img");
            sprites.src = "img/youmu.png";
            this.drawMagic(centerX, centerY);
            if (Math.sin(this.myonAnimationTime * 0.1) >= 0)
                this.drawMyon(centerX, centerY);
            if (player.charge)
                this.drawPlayerShadow(spriteX, width, height, centerX, centerY);
            this.cx.drawImage(sprites, spriteX * width, spriteY * height, width, height, centerX - width / 2, centerY - height / 2, width, height);
            if (Math.sin(this.myonAnimationTime * 0.1) < 0)
                this.drawMyon(centerX, centerY);
            if (player.focus) {
                this.cx.fillStyle = "#f008";
                this.cx.fillRect(posX, posY, player.size.x, player.size.y);
            }
            this.playerAnimationTime++;
            this.myonAnimationTime++;
        };
        this.zoom = zoom;
        this.game = game;
        this.canvas.width = this.game.size.x * this.zoom;
        this.canvas.height = this.game.size.y * this.zoom;
        parent.appendChild(this.canvas);
        this.cx.scale(this.zoom, this.zoom);
        this.cx.imageSmoothingEnabled = false;
    }
}
