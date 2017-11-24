abstract class BoardItem {

    public position: BoardPosition;
    public element: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.boxSizing = 'border-box';
    }

    public setSize(size: number): void {
        let sizeStr = size + "px";
        this.element.style.width = sizeStr;
        this.element.style.height = sizeStr;
    }

    public setRoundShape(): void {
        this.element.style.borderRadius = "50%";
    }

    public setBackgroundColor(r: number, g: number, b: number): void {
        let colorStr = this.createCSSColor(r, g, b);
        this.element.style.backgroundColor = colorStr;
    }

    public setLayerIndex(index: number): void {
        this.element.style.zIndex = index.toString();
    }

    public setBorderColor(r: number, g: number, b: number): void {
        let colorStr = this.createCSSColor(r, g, b);
        this.element.style.borderColor = colorStr;
    }

    public setSolidBorder(): void {
        this.element.style.borderStyle = "solid";
    }

    public setBorderWidth(size: number): void {
        this.element.style.borderWidth = size + "px";
    }

    public setLeft(value: number): void {
        this.element.style.left = value + "px";
    }

    public setTop(value: number): void {
        this.element.style.top = value + "px";
    }

    public setMargin(value: number): void {
        this.element.style.margin = value + "px";
    }

    public isBlocker(): boolean {
        return false;
    }

    public isCollectable(): boolean {
        return false;
    }

    private createCSSColor(r: number, g: number, b: number) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

}