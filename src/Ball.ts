class Ball extends BoardItem {

    public constructor() {
        super();
        this.setRoundShape();
        this.setBackgroundColor(127, 0, 0);
        this.setLayerIndex(3);
    }

    setPosition(pos: BoardPosition): void {
        this.position = pos;
    }

}