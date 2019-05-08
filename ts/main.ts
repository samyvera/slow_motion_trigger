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

var initControlOptions = (controls: Map<number, string>): void => {
    var parent: HTMLElement = document.getElementById('controls');

    var defaultControls: HTMLButtonElement = document.createElement("button");
    defaultControls.innerHTML = "Default";
    defaultControls.className = "lineButton";
    defaultControls.onclick = () => {
        if (!controlRequest) {
            resetControls(defaultKeyCodes, controls);
            keys = trackKeys(controls);
        }
    };
    parent.appendChild(defaultControls);

    controls.forEach((control: string, key: number) => {
        var button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = keyCodes[key];
        button.id = controls.get(key);
        button.onclick = () => {
            if (!controlRequest) {
                button.className = "clickedControl";
                controls = changeControl(key, controls);
                keys = trackKeys(controls);
                controlRequest = true;
            }
        }
        parent.appendChild(button);
        var p: HTMLParagraphElement = document.createElement("p");
        p.innerHTML = control.charAt(0).toUpperCase() + control.slice(1);
        parent.appendChild(p);
    });

    var back: HTMLButtonElement = document.createElement("button");
    back.innerHTML = "Back";
    back.className = "lineButton";
    back.onclick = () => {
        if (!controlRequest) document.getElementById('controls-container').style.display = 'none';
    }
    parent.appendChild(back);
}

var changeControl = (id: number, controls: Map<number, string>): Map<number, string> => {
    var handler = (event: KeyboardEvent): void => {
        controls.set(event.keyCode, controls.get(id));
        if (event.keyCode !== id) controls.delete(id);
        document.getElementById(controls.get(event.keyCode)).innerHTML = keyCodes[event.keyCode];
        document.getElementById(controls.get(event.keyCode)).onclick = () => {
            if (!controlRequest) {
                document.getElementById(controls.get(event.keyCode)).className = "clickedControl";
                controls = changeControl(event.keyCode, controls);
                keys = trackKeys(controls);
                controlRequest = true;
            }
        }
        document.getElementById(controls.get(event.keyCode)).classList.remove("clickedControl");
        removeEventListener("keydown", handler);
        controlRequest = false;
    }
    addEventListener("keydown", handler);
    return controls;
}

var resetControls = (defaultKeyCodes: Array<number>, controls: Map<number, string>): Map<number, string> => {
    controls.forEach((control: string, key: number) => {
        var newKey: number;
        if (control === "left") newKey = defaultKeyCodes[0];
        else if (control === "up") newKey = defaultKeyCodes[1];
        else if (control === "right") newKey = defaultKeyCodes[2];
        else if (control === "down") newKey = defaultKeyCodes[3];
        else if (control === "shoot") newKey = defaultKeyCodes[4];
        else if (control === "bomb") newKey = defaultKeyCodes[5];
        else if (control === "focus") newKey = defaultKeyCodes[6];

        controls.set(newKey, control);
        if (newKey !== key) controls.delete(key);

        document.getElementById(control).innerHTML = keyCodes[newKey];
        document.getElementById(control).onclick = () => {
            if (!controlRequest) {
                document.getElementById(control).className = "clickedControl";
                controls = changeControl(newKey, controls);
                keys = trackKeys(controls);
                controlRequest = true;
            }
        }
    });
    return controls;
}

var setDefaultControls = (defaultKeyCodes: Array<number>): Map<number, string> => {
    var defaultControls = new Map<number, string>([
        [defaultKeyCodes[0], "left"],
        [defaultKeyCodes[1], "up"],
        [defaultKeyCodes[2], "right"],
        [defaultKeyCodes[3], "down"],
        [defaultKeyCodes[4], "shoot"],
        [defaultKeyCodes[5], "bomb"],
        [defaultKeyCodes[6], "focus"]
    ]);

    return defaultControls;
}
var defaultKeyCodes: Array<number> = [37, 38, 39, 40, 87, 88, 16];
var controls = setDefaultControls(defaultKeyCodes);
var controlRequest: boolean = false;
var keys: Map<string, boolean> = trackKeys(controls);
var zoom: number = 3;

window.onload = (): void => {
    initControlOptions(controls);
    
    var game: Game = new Game();
    var display: Canvas = new Canvas(game, document.body, zoom);
    var frame = (time: number): void => {
        game.update(keys);
        display.drawFrame(time, zoom);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
};