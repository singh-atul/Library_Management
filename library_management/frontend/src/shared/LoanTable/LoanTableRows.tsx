import React, { FC } from 'react';

const renderLoanData = (loanData: {[key: string]: any}) => {
    return Object.keys(loanData).map((key, index) => {
        if(typeof (loanData as any)[key] === 'object') {
            return null
        }


        return (<tr key={index}>
                    <td>{key}</td>
                    <td>{(loanData as any)[key] || 'nil'}</td>
                </tr>)
            });
}


const LoanTableRows: FC<{ loanData: {[key: string]: any} }> = ({loanData}) =>  (
    <>
     {renderLoanData(loanData)}
    </>
);


export default LoanTableRows;