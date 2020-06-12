import React from 'react';
import classes from './Button.module.css';

const Button = ({type, children, onClick}) => {
    const cls = [
        classes.button,
        classes[type]
    ]

    return <button onClick={onClick} className={cls.join(' ')}>{children}</button>
}

export default Button;