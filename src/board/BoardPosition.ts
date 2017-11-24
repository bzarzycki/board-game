class BoardPosition {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public movedLeft(): BoardPosition {
        return new BoardPosition(this.x - 1, this.y);
    }

    public movedRight(): BoardPosition {
        return new BoardPosition(this.x + 1, this.y);
    }

    public movedUp(): BoardPosition {
        return new BoardPosition(this.x, this.y - 1);
    }

    public movedDown(): BoardPosition {
        return new BoardPosition(this.x, this.y + 1);
    }

}