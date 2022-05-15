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
    colors: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.colors = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.PIECE;
        this.id = Number(Math.random().toString(36).substr(2, 9));
    }

    canMove(target: Cell): boolean {
        return true;
    }

    moveFigure(target: Cell) {
    }
}