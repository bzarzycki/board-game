class Main {

    public static main() {

        document.title = 'Ball game';

        let board = new Board();
        let ball = new Ball();

        board.generate(20, 20);
        board.addBallElement(10, 10);

        document.onkeydown = checkKey;

        function checkKey(e) {

            let code = Keyboard.getKeyCode(e);
            let newPos = null;

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
        }
    }

}

document.addEventListener('DOMContentLoaded', Main.main);