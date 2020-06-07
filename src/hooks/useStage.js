import { useState, useEffect } from 'react';

import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        // TODO: optimize code
        const sweepRowsRotateColumns = newStage => {
            let clearedCount = 0;
            newStage = newStage.reduce((acc, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);
                    clearedCount++;
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return acc;
                }
                acc.push(row);
                return acc;
            }, []);
            if (clearedCount > 0) {
                newStage.forEach((row, y) => {
                    row.unshift(...row.splice(-clearedCount));
                });
            }
            return newStage;
        };

        const updateStage = prevStage => {
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // Then check if we collided
            if (player.collided) {
                resetPlayer();
                return sweepRowsRotateColumns(newStage);
            }

            return newStage;
        };

        setStage(prev => updateStage(prev))

    }, [player, resetPlayer, rowsCleared])

    return [stage, setStage, rowsCleared];
}