var trackKeys = (codes) => {
    var pressed = new Map();
    codes.forEach(code => pressed.set(code, false));
    var handler = (event) => {
        if (codes.get(event.keyCode) !== undefined) {
            pressed.set(codes.get(event.keyCode), event.type === "keydown");
            event.preventDefault();
        }
    };
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
};
var keys = trackKeys(new Map([[37, "left"], [38, "up"], [39, "right"], [40, "down"], [87, "shoot"], [88, "bomb"], [16, "focus"]]));
var zoom = 3;
window.onload = () => {
    var game = new Game();
    var display = new Canvas(game, document.body, zoom);
    var frame = (time) => {
        game.update(keys);
        display.drawFrame(time, zoom);
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
};
