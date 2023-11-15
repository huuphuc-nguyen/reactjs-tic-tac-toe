import React from 'react'
import './Square.css'
import { useState } from 'react'

const Square = (props) => {

    const [isHover, setIsHover] = useState(Boolean);

    return (
        <div>
            <button className={'square button-square'} 
            onClick={props.onClickHandler}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
                {props.value ? props.value : isHover ? (props.xIsNext ? 'X' : 'O') : ''}
            </button>
        </div>
    )
}

export default Square
