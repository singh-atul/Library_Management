import React, { FC, memo, useCallback } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { ILoan } from '../../../../models';
import withEllipsis from '../HOCs/withElipsis';
import {SectionTitle} from '..';
import './BorrowedBooks.css';


interface Props {
  borrows: ILoan[];
  showLoan: (arg: Partial<ILoan>) => any;
  isAdmin?: boolean;
}

export const BorrowedBooks: FC<Props> = memo(({ borrows, showLoan, isAdmin }) => {
    const onShowLoan = useCallback(loan => () => showLoan(loan), [showLoan]);

    return (
      <Col
        as={'aside'}
        className="rounded h-50 p-0 bg-light border border-light Borrowed"
        sm={12}
        md={3}
      >
        <SectionTitle title={isAdmin? 'All Book Loans' : 'My Book Loans'} />
        <ListGroup>
          {
            borrows.map((borrow, i) => (<ListGroup.Item
                style={{cursor: 'pointer'}}
                className={borrows[i].approvedOn ? 'Approved': ''}
                key={i}
                onClick={onShowLoan(borrows[i])}>{
                  withEllipsis(
                    <span>{borrow.book?.title}</span>
                  )
                }</ListGroup.Item>))
          }
      </ListGroup>
      </Col>
    )
});
