import React, { FC } from 'react';
import './SectionTitle.css'
interface Props {
    title: string;
}

 export const SectionTitle: FC<Props> =  ({title}) => (
        <header className="p-1 pr-5 mt-2 mb-2 text-light SectionTitle">
            <h4>{title}</h4>
        </header>
    );
