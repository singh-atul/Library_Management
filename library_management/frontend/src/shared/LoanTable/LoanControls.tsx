import React, { FC } from 'react';
import { Button } from 'react-bootstrap';

const btnsStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '.2rem',
    marginLight: '.2rem'
};


interface Props {
    isAdmin: boolean;
    notifyToReturn: () => unknown;
    completeLoan: () => unknown;
    loanApproved: boolean;
    approveLoan: () => unknown;
}

const LoanControls: FC<Props>  = ({
    isAdmin,
    notifyToReturn,
    completeLoan, 
    loanApproved,
    approveLoan,
}) => {
    const completeLoanText = isAdmin ? 
        'Decline' : 
        'Return Book From User';

    return <>
        {
            isAdmin  && loanApproved ? 
                <Button onClick={notifyToReturn} variant="secondary">
                    Notify To Return
                </Button>
            :
            null
        }
        <Button style={btnsStyle} variant="primary" onClick={completeLoan}>
            {completeLoanText}
        </Button>
       {
           isAdmin && !loanApproved ?
            <Button style={btnsStyle} onClick={approveLoan}>
                Approve
            </Button>
            :
            null
        }
    </>
}

export default LoanControls;