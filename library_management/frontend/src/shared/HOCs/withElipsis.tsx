import React from 'react'

const withEllipsis =(element: JSX.Element, styleOverride: any = {})  => (
    <div style={{
        display: 'inline-block',
        width: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        ...styleOverride
    }}>
        {element}
    </div>
);


export default withEllipsis;
