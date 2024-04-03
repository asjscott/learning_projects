"""
Tic Tac Toe Player
"""

import copy
import math

X = "X"
O = "O"
EMPTY = None


def initial_state():
    """
    Returns starting state of the board.
    """
    return [[EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]]


def player(board):
    """
    Returns player who has the next turn on a board.
    """
    if terminal(board):
        return "Game Over"

    moves = sum(x.count(EMPTY) for x in board)
    if moves % 2 == 0:
        return O
    else:
        return X


def actions(board):
    """
    Returns set of all possible actions (i, j) available on the board.
    """
    if terminal(board):
        return "Game Over"

    actions = set()
    for row in range(3):
        for move in range(3):
            if board[row][move] == EMPTY:
                actions.add((row, move))
    return actions



def result(board, action):
    """
    Returns the board that results from making move (i, j) on the board.
    """
    if board[action[0]][action[1]] != EMPTY:
        raise Exception

    if action[0] < 0 or action[0] > 2 or action[1] < 0 or action[1] > 2:
        raise Exception

    new_board = copy.deepcopy(board)
    new_board[action[0]][action[1]] = player(board)

    return new_board


def winner(board):
    """
    Returns the winner of the game, if there is one.
    """
    for row in board:
        if EMPTY not in row and len(set(row)) == 1:
            return row[0]

    for j in range(3):
        if len(set(board[i][j] for i in range(3))) == 1:
            if board[0][j] != EMPTY:
                return board[0][j]

    if len(set(board[i][i] for i in range(3))) == 1:
        return board[0][0]

    if len(set(board[i][len(board)-i-1] for i in range(3))) == 1:
        return board[0][2]

    return None


def terminal(board):
    """
    Returns True if game is over, False otherwise.
    """
    if winner(board) != None:
        return True

    if sum(x.count(EMPTY) for x in board) == 0:
        return True

    return False


def utility(board):
    """
    Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
    """
    if winner(board) == X:
        return 1

    if winner(board) == O:
        return -1

    return 0

def minimax(board):
    """
    Returns the optimal action for the current player on the board.
    """
    if terminal(board) == True:
        return None

    if player(board) == X:
        optimal_move = None
        v = float("-inf")
        for move in actions(board):
            max = min_value(result(board, move))
            if max > v:
                v = max
                optimal_move = move
        return optimal_move


    if player(board) == O:
        optimal_move = None
        v = float("inf")
        for move in actions(board):
            min = max_value(result(board, move))
            if min < v:
                v = min
                optimal_move = move
        return optimal_move


def max_value(board):

    if terminal(board) == True:
        return utility(board)

    v = float("-inf")

    for move in actions(board):
        max = min_value(result(board, move))
        if max > v:
            v = max
    return v




def min_value(board):

    if terminal(board) == True:
        return utility(board)

    v = float("inf")

    for move in actions(board):
        min = max_value(result(board, move))
        if min < v:
            v = min
    return v


print(minimax([[EMPTY, O, O],
            [EMPTY, X, EMPTY],
            [X, EMPTY, EMPTY]]))
