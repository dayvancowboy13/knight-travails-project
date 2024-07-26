#!/usr/bin/env node
import GraphBuilder from './GraphBuilder.js';

// each square is a node on the graph
// build edge list of each square's valid moves
// prune the list of duplicates
// ----> i.e. from 0,0 to 2, 1, the edge from 2,1 to 0,0 is the same
// -> if the move lands on a square "lower" than the current one, omit it
// "lower" here means both x and y coordinate of the target square are less
// than the current square

// adjacency array index determined by: (y)*8 + x+1

// adjacency list = validmoves list (array)

// starting coordinate -> is the destination in its validmoves list?
// if yes -> DONE!
// if no -> go through each valid move, check its valid moves list
// repeat until found

GraphBuilder.knightMoves([0, 0], [3, 3]);