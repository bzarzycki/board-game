class Ball extends BoardItem {

    public constructor() {
        super();

        let color = new Color(127, 0, 0);
        this.setBackgroundColor(color);

        this.setRoundShape();
        this.setLayerIndex(3);
    }

    setPosition(pos: BoardPosition): void {
        this.position = pos;
    }

}