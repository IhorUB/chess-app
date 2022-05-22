import React, { cloneElement, FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board,
    currentPlayer: Player | null;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  
    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.copyBoard();
        setBoard(newBoard);
    }

    function onCellClick(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        } 
    }

    return (
        <div className='board'>
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell => <CellComponent
                        click={onCellClick}
                        key={cell.id}
                        cell={cell}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell.y} />)}
                </React.Fragment>
            )}
        </div>
    )

}

export default BoardComponent;