class Coin extends BoardItem {

    constructor() {
        super();

        this.setLayerIndex(2);
        this.setBackgroundColor(220, 200, 0);
        this.setRoundShape();
        this.setBorderColor(120, 120, 0);
        this.setSolidBorder();
        this.setBorderWidth(2);
    }

    public isCollectable(): boolean {
        return true;
    }

}