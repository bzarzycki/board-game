class Keyboard {
    static readonly KEY_UP = 38;
    static readonly KEY_DOWN = 40;
    static readonly KEY_LEFT = 37;
    static readonly KEY_RIGHT = 39;

    public static getKeyCode(event: KeyboardEvent): number {
        return event.keyCode;
    }
}