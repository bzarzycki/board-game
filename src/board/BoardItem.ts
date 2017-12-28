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

    public setBackgroundColor(color: Color): void {
        this.element.style.backgroundColor = color.toCSSValue();
    }

    public setLayerIndex(index: number): void {
        this.element.style.zIndex = index.toString();
    }

    public setBorderColor(color: Color): void {
        this.element.style.borderColor = color.toCSSValue();
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

}