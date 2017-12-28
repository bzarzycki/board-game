class Color {

    private r: number;
    private g: number;
    private b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    public toCSSValue(): string {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
    }
}