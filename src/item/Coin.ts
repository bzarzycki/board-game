class Coin extends BoardItem {

    constructor() {
        super();

        let bgColor = new Color(220, 200, 0);
        let borderColor = new Color(120, 120, 0);

        this.setBackgroundColor(bgColor);
        this.setBorderColor(borderColor);
        this.setLayerIndex(2);
        this.setRoundShape();
        this.setSolidBorder();
        this.setBorderWidth(2);
    }

    public isCollectable(): boolean {
        return true;
    }

}