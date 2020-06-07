import React from 'react';
import { StyledDisplay } from './styles/StyledDisplay';
import { NextPiece } from './Grid';

export const Display = ({ gameOver, text }) => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)
export const DisplayNext = ({ text, next }) => (
    <StyledDisplay>
        {text}
        <NextPiece board={next} />
    </StyledDisplay>
)
