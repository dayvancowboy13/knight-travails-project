#!/usr/bin/env node
import GraphBuilder from './GraphBuilder.js';


// starting coordinate -> is the destination in its validmoves list?
// if yes -> DONE!
// if no -> go through each valid move, check its valid moves list
// repeat until found

GraphBuilder.knightMoves([0, 0], [7, 7]);


// get the next move in the queue; = current
// check current's valid moves for the end