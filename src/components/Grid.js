import React from 'react';
import { StyledStage, StyledNextPiece } from './styles/StyledGrid'

import Cell from './Cell';

export const Stage = ({ stage }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) =>
            <Cell key={x} type={cell[0]} />
        ))}
    </StyledStage>
)

export const NextPiece = ({ board }) => (
    <StyledNextPiece width={board[0].length} height={board.length}>
        {board.map(row => row.map((cell, x) =>
            <Cell key={x} type={cell[0]} />
        ))}
    </StyledNextPiece>
)


