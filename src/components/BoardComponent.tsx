import React, { cloneElement, FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

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
            setSelectedCell(null);
        } else setSelectedCell(cell);
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