class Maze {

    private mazeMatrix: number[][];

    public generate(board: Board): number[][] {

        this.mazeMatrix = [];

        for (let x = 0; x < board.width; x++) {
            this.mazeMatrix[x] = [];

            for (let y = 0; y < board.height; y++) {
                this.mazeMatrix[x][y] = 0;
            }
        }

        this.mazeMatrix[board.width / 2][board.height / 2] = 1;
        let iterCount = board.width * board.height * 0.8;

        for (let i = 0; i < iterCount;) {
            let pos = board.randomPosition();

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
    }
}