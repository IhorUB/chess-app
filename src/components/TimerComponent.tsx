import { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const TimerComponent: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [whiteTime, setWhiteTime] = useState(500);
    const [blackTime, setBlackTime] = useState(500);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) clearInterval(timer.current);
        const cb = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(cb, 1000);
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1);
    }

    function restartGame() {
        restart();
        setWhiteTime(500);
        setBlackTime(500);
    }

    return (
        <div>
            <button onClick={restartGame}>Restart game</button>
            <h2>White time: {whiteTime}</h2>
            <h2>Black time: {blackTime}</h2>
        </div>
    )
}

export default TimerComponent;