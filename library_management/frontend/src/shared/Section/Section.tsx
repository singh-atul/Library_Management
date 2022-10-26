import React, { FC } from 'react'
import { Col, ColProps } from 'react-bootstrap'
import { SectionTitle } from '..'


interface Props {
    title: string;
    dimensions: {} & ColProps;
}

export const Section: FC<Props> = ({title, children, dimensions}) => {
    return (
        <Col
            className="rounded p-2 ml-3  mb-2 bg-light"
            {...dimensions}
        >
            <SectionTitle title={title} />
            {children}
        </Col>
    );
}
