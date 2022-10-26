
import React, { FC, useCallback } from 'react';
import { Table } from 'react-bootstrap';

import { ILoan } from '../../../../models';
import LoanControls from './LoanControls';
import LoanTableBody from './LoanTableBody';
import LoanTableRows from './LoanTableRows';


interface Props {
    loan: ILoan,
    notifyToReturn?: (loan: ILoan) =>  any;
    completeLoan?: (loan: ILoan) => any;
    approveLoan?: (loan: ILoan) => any
    isAdmin?: boolean;
    hideControls?: boolean;
}

const LoanDetails:FC<Props> = ({
    loan,
    notifyToReturn,
    completeLoan,
    approveLoan,
    isAdmin,
    hideControls
}) => {
   const onCompleteLoan = useCallback(() => {
        completeLoan && completeLoan(loan);
    }, [completeLoan, loan])

    const onNotifyToReturn = useCallback(() => {
        notifyToReturn && notifyToReturn(loan);
    }, [notifyToReturn, loan]);

    const onApproveLoan = useCallback(() => {
       approveLoan &&  approveLoan(loan);
    }, [approveLoan, loan]);

    const borrower = loan?.user? {
        id: loan.user.id,
        'First Name': loan.user.firstName,
        'Last Name': loan.user.lastName,
        'Email': loan.user.email
    } : null;
   
    const book = loan?.book ? {
        title: loan.book.title,
        summary: loan.book.summary,
        description: loan.book.description
    } : null;

   return  <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Property</th>
                    <th>Description</th>
                </tr>
            </thead>
            <LoanTableBody> 
                {loan? <LoanTableRows loanData={loan} /> : <></>}
            </LoanTableBody>
            <LoanTableBody tableSectionTitle="Borrower's Information">
                { borrower ? <LoanTableRows loanData={borrower}/> : <></>}
            </LoanTableBody>
            <LoanTableBody tableSectionTitle="Book Summary" >
                {book ? <LoanTableRows loanData={book} /> : <></>}
            </LoanTableBody>

            <tfoot>

            { !hideControls?  <tr>
                <td colSpan={2}>
                    <LoanControls 
                            isAdmin={isAdmin!}
                            notifyToReturn={onNotifyToReturn}
                            completeLoan={onCompleteLoan}
                            approveLoan={onApproveLoan}
                            loanApproved={!!loan.approvedOn}
                        />
                    </td>
                </tr>: null}
                
            </tfoot>
    </Table>
}

export default LoanDetails;