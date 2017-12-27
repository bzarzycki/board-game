var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BoardItem = (function () {
    function BoardItem() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.boxSizing = 'border-box';
    }
    BoardItem.prototype.setSize = function (size) {
        var sizeStr = size + "px";
        this.element.style.width = sizeStr;
        this.element.style.height = sizeStr;
    };
    BoardItem.prototype.setRoundShape = function () {
        this.element.style.borderRadius = "50%";
    };
    BoardItem.prototype.setBackgroundColor = function (r, g, b) {
        var colorStr = this.createCSSColor(r, g, b);
        this.element.style.backgroundColor = colorStr;
    };
    BoardItem.prototype.setLayerIndex = function (index) {
        this.element.style.zIndex = index.toString();
    };
    BoardItem.prototype.setBorderColor = function (r, g, b) {
        var colorStr = this.createCSSColor(r, g, b);
        this.element.style.borderColor = colorStr;
    };
    BoardItem.prototype.setSolidBorder = function () {
        this.element.style.borderStyle = "solid";
    };
    BoardItem.prototype.setBorderWidth = function (size) {
        this.element.style.borderWidth = size + "px";
    };
    BoardItem.prototype.setLeft = function (value) {
        this.element.style.left = value + "px";
    };
    BoardItem.prototype.setTop = function (value) {
        this.element.style.top = value + "px";
    };
    BoardItem.prototype.setMargin = function (value) {
        this.element.style.margin = value + "px";
    };
    BoardItem.prototype.isBlocker = function () {
        return false;
    };
    BoardItem.prototype.isCollectable = function () {
        return false;
    };
    BoardItem.prototype.createCSSColor = function (r, g, b) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    return BoardItem;
}());
var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        document.title = 'Ball game';
        var board = new Board();
        var ball = new Ball();
        board.generate(20, 20);
        board.addBallElement(10, 10);
        document.onkeydown = function (event) {
            var code = Keyboard.getKeyCode(event);
            var newPos = null;
            if (code == Keyboard.KEY_UP) {
                newPos = board.ball.position.movedUp();
            }
            else if (code == Keyboard.KEY_DOWN) {
                newPos = board.ball.position.movedDown();
            }
            else if (code == Keyboard.KEY_LEFT) {
                newPos = board.ball.position.movedLeft();
            }
            else if (code == Keyboard.KEY_RIGHT) {
                newPos = board.ball.position.movedRight();
            }
            if (newPos && board.canMoveTo(newPos)) {
                board.ball.setPosition(newPos);
                board.updateBallPosition();
                var obj = board.getObjectAtPosition(newPos);
                if (obj != null && obj.isCollectable()) {
                    board.removeCoin(newPos);
                }
            }
        };
    };
    return Main;
}());
document.addEventListener('DOMContentLoaded', Main.main);
var Board = (function () {
    function Board() {
    }
    Board.prototype.generate = function (width, height) {
        var boardContainer = document.createElement('div');
        document.body.appendChild(boardContainer);
        document.body.style.margin = '0';
        document.body.style.backgroundColor = 'black';
        this.container = boardContainer;
        this.objects = [];
        this.width = width;
        this.height = height;
        var boardSize = Math.min(window.innerHeight, window.innerWidth);
        this.gridSize = Math.floor(boardSize / Math.max(width, height));
        boardContainer.style.margin = "auto";
        boardContainer.style.position = "relative";
        boardContainer.style.width = boardSize + 'px';
        boardContainer.style.height = boardSize + 'px';
        for (var x = 0; x < this.width; x++) {
            this.objects[x] = [];
            for (var y = 0; y < this.height; y++) {
                this.objects[x][y] = null;
            }
        }
        var mazeMatrix = new Maze().generate(this);
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                if (mazeMatrix[x][y] == 0) {
                    this.addBlockAtPosition(new BoardPosition(x, y));
                }
                else {
                    this.addTileAtPosition(x, y);
                }
            }
        }
        for (this.coinsCount = 0; this.coinsCount < 50;) {
            var pos = this.randomPosition();
            if (this.getObjectAtPosition(pos) == null) {
                this.addCoinAtPosition(pos);
                this.coinsCount++;
            }
        }
    };
    Board.prototype.addTileAtPosition = function (x, y) {
        var block = new Block();
        var green = Math.round(Math.random() * 32) + 127;
        block.setBackgroundColor(0, green, 0);
        block.setSize(this.gridSize);
        block.setLeft(this.toPosition(x));
        block.setTop(this.toPosition(y));
        this.container.appendChild(block.element);
    };
    Board.prototype.addBlockAtPosition = function (pos) {
        var block = new Block();
        var blue = Math.round(Math.random() * 16) + 15;
        block.setLeft(this.toPosition(pos.x));
        block.setTop(this.toPosition(pos.y));
        block.setBackgroundColor(0, 0, blue);
        block.setSize(this.gridSize);
        this.setObjectAtPosition(pos, block);
        this.container.appendChild(block.element);
    };
    Board.prototype.addCoinAtPosition = function (pos) {
        var coin = new Coin();
        var coinSize = Math.round(this.gridSize * 2 / 3);
        var margin = Math.round(this.gridSize * 1 / 6);
        coin.setSize(coinSize);
        coin.setLeft(pos.x * this.gridSize);
        coin.setTop(pos.y * this.gridSize);
        coin.setMargin(margin);
        this.setObjectAtPosition(pos, coin);
        this.container.appendChild(coin.element);
    };
    Board.prototype.addBallElement = function (x, y) {
        this.ball = new Ball();
        this.ball.setPosition(new BoardPosition(x, y));
        this.ball.setSize(this.gridSize);
        this.ball.setLeft(this.toPosition(x));
        this.ball.setTop(this.toPosition(y));
        this.container.appendChild(this.ball.element);
    };
    Board.prototype.updateBallPosition = function () {
        this.ball.setLeft(this.toPosition(this.ball.position.x));
        this.ball.setTop(this.toPosition(this.ball.position.y));
    };
    Board.prototype.getObjectAtPosition = function (pos) {
        return this.objects[pos.x][pos.y];
    };
    Board.prototype.toPosition = function (value) {
        return this.gridSize * value;
    };
    Board.prototype.randomPosition = function () {
        var x = Random.fromInterval(0, this.width - 1);
        var y = Random.fromInterval(0, this.height - 1);
        return new BoardPosition(x, y);
    };
    Board.prototype.isBlockedPosition = function (pos) {
        var obj = this.getObjectAtPosition(pos);
        if (obj) {
            return obj.isBlocker();
        }
        return false;
    };
    Board.prototype.hasPosition = function (pos) {
        if (pos.x < 0 || pos.y < 0) {
            return false;
        }
        if (pos.x >= this.width || pos.y >= this.height) {
            return false;
        }
        return true;
    };
    Board.prototype.canMoveTo = function (pos) {
        return this.hasPosition(pos) && !this.isBlockedPosition(pos);
    };
    Board.prototype.removeCoin = function (newPos) {
        var coinElem = this.getObjectAtPosition(newPos).element;
        this.container.removeChild(coinElem);
        this.removeObjectAtPosition(newPos);
        this.coinsCount--;
        if (this.coinsCount == 0) {
            alert("You win!");
        }
    };
    Board.prototype.removeObjectAtPosition = function (pos) {
        this.objects[pos.x][pos.y] = null;
    };
    Board.prototype.setObjectAtPosition = function (pos, obj) {
        this.objects[pos.x][pos.y] = obj;
    };
    return Board;
}());
var BoardPosition = (function () {
    function BoardPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    BoardPosition.prototype.movedLeft = function () {
        return new BoardPosition(this.x - 1, this.y);
    };
    BoardPosition.prototype.movedRight = function () {
        return new BoardPosition(this.x + 1, this.y);
    };
    BoardPosition.prototype.movedUp = function () {
        return new BoardPosition(this.x, this.y - 1);
    };
    BoardPosition.prototype.movedDown = function () {
        return new BoardPosition(this.x, this.y + 1);
    };
    return BoardPosition;
}());
var Keyboard = (function () {
    function Keyboard() {
    }
    Keyboard.getKeyCode = function (event) {
        return event.keyCode;
    };
    Keyboard.KEY_UP = 38;
    Keyboard.KEY_DOWN = 40;
    Keyboard.KEY_LEFT = 37;
    Keyboard.KEY_RIGHT = 39;
    return Keyboard;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        _this.setRoundShape();
        _this.setBackgroundColor(127, 0, 0);
        _this.setLayerIndex(3);
        return _this;
    }
    Ball.prototype.setPosition = function (pos) {
        this.position = pos;
    };
    return Ball;
}(BoardItem));
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super.call(this) || this;
        _this.setLayerIndex(1);
        return _this;
    }
    Block.prototype.isBlocker = function () {
        return true;
    };
    return Block;
}(BoardItem));
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin() {
        var _this = _super.call(this) || this;
        _this.setLayerIndex(2);
        _this.setBackgroundColor(220, 200, 0);
        _this.setRoundShape();
        _this.setBorderColor(120, 120, 0);
        _this.setSolidBorder();
        _this.setBorderWidth(2);
        return _this;
    }
    Coin.prototype.isCollectable = function () {
        return true;
    };
    return Coin;
}(BoardItem));
var Maze = (function () {
    function Maze() {
    }
    Maze.prototype.generate = function (board) {
        this.mazeMatrix = [];
        for (var x = 0; x < board.width; x++) {
            this.mazeMatrix[x] = [];
            for (var y = 0; y < board.height; y++) {
                this.mazeMatrix[x][y] = 0;
            }
        }
        this.mazeMatrix[board.width / 2][board.height / 2] = 1;
        var iterCount = board.width * board.height * 0.8;
        for (var i = 0; i < iterCount;) {
            var pos = board.randomPosition();
            var sum = 0;
            if (pos.x > 0) {
                var leftPos = pos.movedLeft();
                if (this.mazeMatrix[leftPos.x][leftPos.y] == 1) {
                    sum++;
                }
            }
            if (pos.y > 0) {
                var upPos = pos.movedUp();
                if (this.mazeMatrix[upPos.x][upPos.y] == 1) {
                    sum++;
                }
            }
            if (pos.x < board.width - 1) {
                var rightPos = pos.movedRight();
                if (this.mazeMatrix[rightPos.x][rightPos.y] == 1) {
                    sum++;
                }
            }
            if (pos.y < board.height - 1) {
                var downPos = pos.movedDown();
                if (this.mazeMatrix[downPos.x][downPos.y] == 1) {
                    sum++;
                }
            }
            if (sum == 1) {
                this.mazeMatrix[pos.x][pos.y] = 1;
                i++;
            }
        }
        return this.mazeMatrix;
    };
    return Maze;
}());
var Random = (function () {
    function Random() {
    }
    Random.fromInterval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Random;
}());
//# sourceMappingURL=app-build.js.map