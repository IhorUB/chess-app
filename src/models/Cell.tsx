import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figure/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;

    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEmptyVertical(target: Cell): boolean {
        if (target.x !== this.x) return false;

        const min = Math.min(target.y, this.y);
        const max = Math.max(target.y, this.y);

        for (let y = min + 1; y < max; y++) {
            const isVerticalCellEmpty = this.board.getCell(target.x, y).isEmpty();
            if (!isVerticalCellEmpty) return false;
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if(target.y !== this.y) return false;
        const min = Math.min(target.x, this.x);
        const max = Math.max(target.x, this.x);

        for(let x = min + 1; x < max; x++) {
            const isHorizontalCellEmpty = this.board.getCell(x, this.y).isEmpty();
            if(!isHorizontalCellEmpty) return false;
        }
        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absX !== absY) return false;
        //TODO: diagonal logic 
        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            target.setFigure(this.figure);
            this.figure = null
        }
    }
}    