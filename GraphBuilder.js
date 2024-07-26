export default class GraphBuilder {

    static {

        console.log('Graph builder initializing...');
        this.moveCheck = [
            [1, 2],
            [1, -2],
            [2, 1],
            [2, -1],
            [-1, -2],
            [-1, 2],
            [-2, -1],
            [-2, 1]
        ];

        this.fullBoard = this.getFullBoardCoords();
        // this.prettyPrint(this.fullBoard);
        // console.log(this.fullBoard);

        // array of each square's valid moves
        this.adjacencyArray = [];

        // compute the valid moves
        this.fullBoard.forEach((square) => {

            this.adjacencyArray.push(this.computeValidMoves(square));

        });

        // additional array to keep track of squares already "visited"
        this.hasChecked = new Array(this.adjacencyArray.length);
        for (let i = 0; i < this.hasChecked.length; i++) {

            this.hasChecked[i] = false;

        }


        // console.log(this.hasChecked);


        // {

        //     this.edgeList = [];

        //     this.fullBoard.forEach((square) => {

        //         let validMoves = this.determineValidMoves(square);
        //         validMoves.forEach((move) => {

        //             this.edgeList.push(move);

        //         });

        //     });

        // }

        // this.determineValidMoves([
        //     7,
        //     0
        // ]);

        // console.log(halfBoard);

    }

    static knightMoves(start, end) {

        console.log(`Start: ${start}; End: ${end}`);

        let current = start;
        let queue = [];
        let bContinue = true;
        queue.push(current);

        // is the end square in start square's valid moves?

        let validMoves = [];
        // queue.push(validMoves.filter((move) => !this.isAlreadyChecked(move)));
        for (let i = 0; i < 6; i++) {

            current = queue.shift();
            // add to alreadychecked
            this.hasChecked[this.coordToIndex(current)] = true;


            console.log('Current move is:');
            console.log(current);
            if (this.isSameSquare(current, end)) {

                console.log('End has been found!');

                return;

            } else {

                // add that square's moves to the queue
                validMoves = this.getValidMoves(current).filter((move) => !this.isAlreadyChecked(move));
                validMoves.forEach((move) => {

                    queue.push(move);

                });

            }

            console.log('Queue is currently: ');
            console.log(queue);


        }

        // return an array describing the shortest path to the point

    }

    static isAlreadyChecked(coords) {

        let index = this.coordToIndex(coords);
        return this.hasChecked[index];

    }

    static isSameSquare(a, b) {

        if (a[0] === b[0] && a[1] === b[1]) return true;
        else return false;

    }

    static getValidMoves(coords) {

        let index = this.coordToIndex(coords);
        return this.adjacencyArray[index];

    }

    static printSquaresValidMoves(index) {

        console.log(this.adjacencyArray[index]);

    }

    static printAllValidMoves() {

        for (let i = 0; i < this.adjacencyArray.length; i++) {

            console.log(this.adjacencyArray[i]);

        }

    }

    static coordToIndex(coord) {

        return 8 * coord[1] + coord[0];

    }

    static prettyPrint(arr) {

        arr.forEach((elem) => {

            console.log(`${elem[0]},${elem[1]}`);

        });

    }

    static computeValidMoves(boardSquare) {

        let validMoves = [];

        this.moveCheck.forEach((move) => {

            let xMove = boardSquare[0] + move[0];
            let yMove = boardSquare[1] + move[1];

            // first, check the target square is on the board
            if (xMove >= 0 && xMove <= 7 && (yMove >= 0 && yMove <= 7)) {

                validMoves.push([xMove, yMove]);
                // then check that the move is not below AND behind the current square
                if (!(xMove < boardSquare[0] && yMove < boardSquare[1])) {


                }

            }
            // else console.log('Invlaid');

        });

        // console.log(validMoves);
        return validMoves;

    }

    static getFullBoardCoords() {

        let arr = [];
        for (let y = 0; y <= 7; y++) {

            for (let x = 0; x <= 7; x++) {

                arr.push([x, y]);

            }

        }

        return arr;

    }

    static getHalfBoardCoords() {

        let arr = [];
        for (let y = 0; y <= 7; y++) {

            for (let x = 0; x <= 7; x++) {

                if (x >= y) {

                    // console.log(`[${ x }, ${ y }]`);
                    arr.push([x, y]);

                }

            }

        }

        return arr;

    }

}