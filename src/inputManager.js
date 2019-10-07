import Vector2d from './vector2d';

const restartKeyState = key => {
    key.isPressed = false;
    key.wasPressed = false;
    key.isDown = false;
};

export const InputManager = {
    _canvas: null,
    keys: {},
    mouseState: {
        pos: new Vector2d(0, 0),
        posInCanvas: new Vector2d(0, 0),
        prevPos: new Vector2d(0, 0),
        mouse1: false,
        mouse2: false
    },
    init (canvasSelector) {
        this._canvas = document.querySelector(canvasSelector);

        this._initKeyBoardEvents();
        this._initMouseEvents();

        for(let i = 0; i < 255; i++) {
            this.keys[i] = {
                isPressed: false,
                wasPressed: false,
                isDown: false,
            }
        }
    },
    update() {
        Object.keys(this.keys).forEach(keyCode => {
            if (this.keys[keyCode].wasPressed) {
                this.keys[keyCode].isDown = true;
                this.keys[keyCode].isPressed = false;
            }

            if (!this.keys[keyCode].isDown) {
                this.keys[keyCode].wasPressed = this.keys[keyCode].isPressed;
            }
        });
    },
    _initKeyBoardEvents () {
        window.addEventListener('keydown', (e) => {
            if (!this.keys[e.keyCode]) {
                this.keys[e.keyCode] = {
                    isPressed: true,
                    wasPressed: false,
                    isDown: false
                };

                return;
            } else {
                this.keys[e.keyCode].isDown = true;
            }

            if (!this.keys[e.keyCode].isDown) {
                this.keys[e.keyCode].isPressed = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            restartKeyState(this.keys[e.keyCode]);
        });
    },
    _initMouseEvents () {
        window.addEventListener('mousemove', (e) => {
            const boundingRect = this._canvas.getBoundingClientRect();

            const pos = new Vector2d(Math.floor(e.clientX), Math.floor(e.clientY));
            const posInCanvas = new Vector2d(pos.x - Math.floor(boundingRect.x), pos.y - Math.floor(boundingRect.y));

            this.mouseState.prevPos = this.mouseState.pos;

            this.mouseState.pos = pos;
            this.mouseState.posInCanvas = posInCanvas;
        });

        // #TODO: finish after getting normal mouse
        window.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                this.mouseState.mouse1 = true;
            }

            if (e.button === 2) {
                this.mouseState.mouse2 = true;
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                this.mouseState.mouse1 = false;
            }

            if (e.button === 2) {
                this.mouseState.mouse2 = false;
            }
        });
    }
}
