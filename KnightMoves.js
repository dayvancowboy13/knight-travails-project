export default function knightMoves(start, end) {

    // INITIALIZATION ///
    const moveCheck = [
        [1, 2],
        [1, -2],
        [2, 1],
        [2, -1],
        [-1, -2],
        [-1, 2],
        [-2, -1],
        [-2, 1]
    ];

    const fullBoard = generateFullBoard();

    let adjacencyArray = [];

    fullBoard.forEach((square) => {

        adjacencyArray.push(computeValidMoves(square));

    });

    let hasBeenEnqueued = new Array(adjacencyArray.length);
    for (let i = 0; i < hasBeenEnqueued.length; i++) {

        hasBeenEnqueued[i] = false;

    }

    const node = function (coords, lineage) {

        return {
            'coords': coords, // [x, y]
            'lineage': lineage
        };

    };

    // ////////////////////////////////////////////

    // MAIN LOGIC FOR THE LOOP //
    console.log(`Start: [${start}]; End: [${end}]`);
    let queue = [];
    addToQueue(start, 'root');
    let validNextMoves = [];
    let current;


    while (queue.length > 0) {

        current = queue.shift();
        console.log(`Current move is: ${current.coords}\n`);

        // get the next moves of the current square IF they have not previously been placed on the queue
        validNextMoves = getValidNextMoves(current.coords).filter((move) => !wasAlreadyEnqueued(move));

        if (endInValidNextMoves()) {

            console.log('Destination found! Here is the path: ');

            let path = current.lineage.replace('root, ', '');
            path += `, ${current.coords}, ${end}`;
            path = path.split(', ');
            console.log('You got there in ' + (path.length - 1) + ' moves. Here is the path: ');
            path.forEach((move) => {

                console.log(`[${move}]`);

            });


            queue = [];
            break;


        } else {

            validNextMoves.forEach((move) => {

                addToQueue(move, current.lineage + `, ${current.coords}`);
                addToEnqueuedArray(validNextMoves);

            });

        }

        console.log('Queue is: ');
        console.log(queue);

    }


    // ////////////////////////////////////


    function endInValidNextMoves() {

        for (let i = 0; i < validNextMoves.length; i++) {

            if (isSameSquare(validNextMoves[i], end)) return true;

        }

        return false;

    }

    function isSameSquare(a, b) {

        try {

            if (a[0] === b[0] && a[1] === b[1]) return true;

            else return false;

        } catch (err) {

            return false;

        }


    }

    function wasAlreadyEnqueued(coords) {

        let index = coordToIndex(coords);
        return hasBeenEnqueued[index];

    }

    function addToEnqueuedArray(movesArray) {

        movesArray.forEach((move) => {

            hasBeenEnqueued[coordToIndex(move)] = true;

        });

    }

    function addToQueue(coords, lineage) {

        queue.push(node(coords, lineage));

    }

    function coordToIndex(coord) {

        return 8 * coord[1] + coord[0];

    }

    function getValidNextMoves(coords) {

        let index = coordToIndex(coords);
        return adjacencyArray[index];

    }

    function computeValidMoves(boardSquare) {

        let validMoves = [];

        moveCheck.forEach((move) => {

            let xMove = boardSquare[0] + move[0];
            let yMove = boardSquare[1] + move[1];

            // first, check the target square is on the board
            if (xMove >= 0 && xMove <= 7 && (yMove >= 0 && yMove <= 7)) {

                validMoves.push([xMove, yMove]);
                // then check that the move is not below AND behind the current square
                if (!(xMove < boardSquare[0] && yMove < boardSquare[1])) {


                }

            }

        });

        return validMoves;

    }

    function generateFullBoard() {

        let arr = [];
        for (let y = 0; y <= 7; y++) {

            for (let x = 0; x <= 7; x++) {

                arr.push([x, y]);

            }

        }

        return arr;

    }

    function prettyPrint(arr) {

        arr.forEach((elem) => {

            console.log(`${elem[0]},${elem[1]}`);

        });

    }

}