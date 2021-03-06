import React from 'react';
import './../../app/App.css';

type ErrorPropsType = {
    text: string | boolean
};


export const Error: React.FC<ErrorPropsType> = React.memo(({text}) => {
    
    return (
        <div className="error-message">
            {text}
        </div>
    );
});




