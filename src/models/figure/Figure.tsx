import logo from "../../assets/black-bishop.png";
import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FigureNames {
    PIECE = "Piece",
    KING = "King",
    KNIGHT = "Knight",
    PAWN = "Pawn",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop",
  }

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.PIECE;
        this.id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    }

    canMove(target: Cell): boolean {
        if(target.figure?.color === this.color) return false;
        if(target.figure?.name === FigureNames.KING) return false;
        return true;
    }

    moveFigure(target: Cell) {
    }
}