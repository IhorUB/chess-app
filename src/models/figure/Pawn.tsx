import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";

import whiteLogo from "../../assets/white-pawn.png";
import blackLogo from "../../assets/black-pawn.png";

export class Pawn extends Figure {

    isFirstMove: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        const firstMoveStep = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        const isDefaultMove = target.y === this.cell.y + direction;
        const isFirstMoveStep = target.y === this.cell.y + firstMoveStep;
        const isVerticalMove = this.cell.x === target.x;
        const isTargetEmpty = this.cell.board.getCell(target.x, target.y).isEmpty();

        const isEnemy = this.cell.isEnemy(target);
        const canPawnAttack = target.x === this.cell.x + 1 || target.x === this.cell.x - 1;

        if ((isDefaultMove || (this.isFirstMove && isFirstMoveStep)) && isVerticalMove && isTargetEmpty) return true;

        if (isDefaultMove && canPawnAttack && isEnemy) return true;

        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstMove = false;
    }
}