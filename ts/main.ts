var trackKeys = (codes: Map<number, string>): Map<string, boolean> => {
    var pressed = new Map<string, boolean>();
    codes.forEach(code => pressed.set(code, false));
    var handler = (event: KeyboardEvent): void => {
        if (codes.get(event.keyCode) !== undefined) {
            pressed.set(codes.get(event.keyCode), event.type === "keydown");
            event.preventDefault();
        }
    }
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
}
var keys: Map<string, boolean> = trackKeys(new Map<number, string>([[37, "left"], [38, "up"], [39, "right"], [40, "down"], [87, "shoot"], [88, "bomb"], [16, "focus"]]));
var zoom: number = 3;

window.onload = (): void => {
    var game: Game = new Game();
    var display: Canvas = new Canvas(game, document.body, zoom);
    var frame = (time: number): void => {
        game.update(keys);
        display.drawFrame(time, zoom);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
};