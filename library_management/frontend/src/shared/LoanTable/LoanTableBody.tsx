import React, { FC } from 'react'

interface Props { 
    tableSectionTitle?: string
}

const LoanTableBody: FC<Props> = ({children, tableSectionTitle}) =>(
    <tbody>
        {tableSectionTitle ?
            <tr>
                <td colSpan={2} className="text-capitalize">
                    {tableSectionTitle}
                </td>
            </tr>: null
        }
        {children}
    </tbody>
)

export default LoanTableBody;
