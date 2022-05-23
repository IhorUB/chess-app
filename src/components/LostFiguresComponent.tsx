import { FC } from "react";
import { Figure } from "../models/figure/Figure";

interface LostFiguresProps {
    title: string,
    figures: Figure[]
}

const LostFiguresComponent: FC<LostFiguresProps> = ({ title, figures }) => {

    return (
        <div className="lost-wrap">
            <h3>{title}</h3>
            {figures.map(figure => (
                <div key={figure.id}>
                    {figure.name}
                    {figure.logo && <img width="30" height="auto" src={figure.logo} alt={figure.name} />}
                </div>
            ))}
        </div>
    )
}

export default LostFiguresComponent;