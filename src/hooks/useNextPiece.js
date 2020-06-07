import { useState, useEffect } from 'react';

import { createNextPieceBoard } from '../gameHelpers';


export const useNextPiece = (nextTetromino) => {
    const [nextPieceBoard, setNextPieceBoard] = useState(createNextPieceBoard());

    useEffect(() => {
        const updateNextPiece = (newTetromino) => {
            // First flush the stage
            const newStage = createNextPieceBoard();

            // Then draw the tetromino
            newTetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y][x] = [
                            value,
                        ];
                    }
                });
            });
            return newStage;
        }

        setNextPieceBoard(updateNextPiece(nextTetromino));

    }, [nextTetromino])

    return [nextPieceBoard];
}