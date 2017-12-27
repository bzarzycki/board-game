class Block extends BoardItem {

    constructor() {
        super();
        this.setLayerIndex(1);
    }

    public isBlocker() : boolean {
        return true;
    }

}