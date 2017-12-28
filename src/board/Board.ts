class Board {
    public width: number;
    public height: number;
    public gridSize: number;
    public ball: Ball;
    private objects: BoardItem[][];
    public coinsCount: number;
    public container: HTMLElement;

    public generate(width: number, height: number) {

        let boardContainer = document.createElement('div');
        document.body.appendChild(boardContainer);
        document.body.style.margin = '0';
        document.body.style.backgroundColor = 'black';
        this.container = boardContainer;

        this.objects = [];
        this.width = width;
        this.height = height;
        let boardSize = Math.min(window.innerHeight, window.innerWidth);
        this.gridSize = Math.floor(boardSize / Math.max(width, height));

        boardContainer.style.margin = "auto";
        boardContainer.style.position = "relative";
        boardContainer.style.width = boardSize + 'px';
        boardContainer.style.height = boardSize + 'px';

        for (let x = 0; x < this.width; x++) {
            this.objects[x] = [];

            for (let y = 0; y < this.height; y++) {
                this.objects[x][y] = null;
            }
        }

        let mazeMatrix = new Maze().generate(this);

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (mazeMatrix[x][y] == 0) {
                    this.addBlockAtPosition(new BoardPosition(x, y));
                } else {
                    this.addTileAtPosition(x, y);
                }
            }
        }

        for (this.coinsCount = 0; this.coinsCount < 50;) {
            let pos = this.randomPosition();
            if (this.getObjectAtPosition(pos) == null) {
                this.addCoinAtPosition(pos);
                this.coinsCount++;
            }
        }
    }

    public addTileAtPosition(x: number, y: number) {
        let block = new Block();
        let green = Math.round(Math.random() * 32) + 127;
        let bgColor = new Color(0, green, 0);

        block.setBackgroundColor(bgColor);
        block.setSize(this.gridSize);
        block.setLeft(this.toPosition(x));
        block.setTop(this.toPosition(y));

        this.container.appendChild(block.element);
    }

    addBlockAtPosition(pos: BoardPosition): void {
        let block = new Block();
        let blue = Math.round(Math.random() * 16) + 15;
        let bgColor = new Color(0, 0, blue);

        block.setBackgroundColor(bgColor);
        block.setLeft(this.toPosition(pos.x));
        block.setTop(this.toPosition(pos.y));
        block.setSize(this.gridSize);

        this.setObjectAtPosition(pos, block);
        this.container.appendChild(block.element);
    }

    addCoinAtPosition(pos: BoardPosition): void {
        let coin = new Coin();
        let coinSize = Math.round(this.gridSize * 2 / 3);
        let margin = Math.round(this.gridSize * 1 / 6);

        coin.setSize(coinSize);
        coin.setLeft(pos.x * this.gridSize);
        coin.setTop(pos.y * this.gridSize);
        coin.setMargin(margin);

        this.setObjectAtPosition(pos, coin);
        this.container.appendChild(coin.element);
    }

    addBallElement(x, y): void {
        this.ball = new Ball();
        this.ball.setPosition(new BoardPosition(x, y));
        this.ball.setSize(this.gridSize);
        this.ball.setLeft(this.toPosition(x));
        this.ball.setTop(this.toPosition(y));

        this.container.appendChild(this.ball.element);
    }

    updateBallPosition(): void {
        this.ball.setLeft(this.toPosition(this.ball.position.x));
        this.ball.setTop(this.toPosition(this.ball.position.y));
    }

    public getObjectAtPosition(pos: BoardPosition): BoardItem {
        return this.objects[pos.x][pos.y];
    }

    public toPosition(value: number): number {
        return this.gridSize * value;
    }

    public randomPosition(): BoardPosition {
        let x = Random.fromInterval(0, this.width - 1);
        let y = Random.fromInterval(0, this.height - 1);
        return new BoardPosition(x, y);
    }

    public isBlockedPosition(pos: BoardPosition): boolean {
        let obj = this.getObjectAtPosition(pos);

        if (obj) {
            return obj.isBlocker();
        }

        return false;
    }

    public hasPosition(pos: BoardPosition): boolean {
        if (pos.x < 0 || pos.y < 0) {
            return false;
        }
        if (pos.x >= this.width || pos.y >= this.height) {
            return false;
        }
        return true;
    }

    public canMoveTo(pos: BoardPosition): boolean {
        return this.hasPosition(pos) && !this.isBlockedPosition(pos);
    }

    public removeCoin(newPos: BoardPosition): void {
        let coinElem = this.getObjectAtPosition(newPos).element;
        this.container.removeChild(coinElem);
        this.removeObjectAtPosition(newPos);
        this.coinsCount--;
        if (this.coinsCount == 0) {
            alert("You win!");
        }
    }

    private removeObjectAtPosition(pos: BoardPosition): void {
        this.objects[pos.x][pos.y] = null;
    }

    private setObjectAtPosition(pos: BoardPosition, obj: BoardItem): void {
        this.objects[pos.x][pos.y] = obj;
    }
}