
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Row } from 'react-bootstrap'
import { IBook, ILoan } from '../../../../models'
import Api from '../../api'

import {AllBooks} from '../../shared';
import {BorrowedBooks} from '../../shared'

import LoanDetails from '../../shared/LoanTable/LoanDetails';
import { Section } from '../../shared/Section/Section'
import withModal from '../../shared/HOCs/withModal'
import { defaultModalConfig } from '../../constants'

import './MemberPortal.css';

export default function MemberPortal({userId}: {userId: number}) {
    const [loans, setBorrows] = useState<ILoan[]>([]);
    const [shouldFetchLoans, setShouldFetchLoans] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [shouldShowLoan, setShouldShowLoan]  = useState(false);
    const [loan, setLoan] = useState<Partial<ILoan>>();

    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<ILoan>>();


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: Partial<ILoan>) => {
        setShowModal(true);
        setSelectedBook(fullBook);
    }

    useEffect(() => {
        if(shouldFetchLoans) {
            Api.getBorrows()
            .then(({data}) => {
                setBorrows(data.loans)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            }).finally(() => setShouldFetchLoans(false))
        }
          
    }, [shouldFetchLoans]);

    const borrowBook = (book: IBook) => {
        Api.createLoan({
            userId,
            bookId: book.id,
            days: 7,
        }).then(({data}) => {
            setShouldFetchLoans(!data.error);
        });
    }

    const showLoan = (loanToShow: Partial<ILoan>) => {
        setShouldShowLoan(true);
        setLoan(loanToShow)
    }

    const completeLoan = useCallback((loan: ILoan) => {
        Api.completeLoan(loan)
            .then(({data}) => {

                setShouldFetchLoans(!data.error);
                if(data.error) {
                    setError(data.message)
                }
            })
            .catch((error: { message: React.SetStateAction<string>; }) => {
                setError(error.message)
            })
            .finally(() => {
                setShouldShowLoan(false);
                setLoan({});
            });
    }, []);

    const closeLoanDialog = useCallback(() => {
        setShouldShowLoan(false);
    }, []);


    return (
        <>
         <Row>
            <Section title="Welcome to member portal" dimensions={{xs: 12}}>

                {error? <Alert variant="warning">{error}</Alert>: null}
                {isLoading? <Alert variant="info">Loading....</Alert>: null}
            </Section>
        </Row>
        <Row className="ml-0 mr-0 border MemberPortal">
            <BorrowedBooks
                borrows={loans}
                showLoan={showLoan}
            />
            <AllBooks
                showBookDetails={handleShowModal}
                borrow={borrowBook}
            />

            {withModal({
                Component: LoanDetails,
                modalConfig: {
                    ...defaultModalConfig,
                    handleClose: closeLoanDialog,
                    show: shouldShowLoan,
                    title: loan?.book?.title!
                },
                componentProps: { loan, completeLoan }
            })}

            {withModal({
                Component: LoanDetails,
                modalConfig: {
                    ...defaultModalConfig,
                    handleClose: handleCloseModal,
                    show: showModal,
                },
            })}

            {withModal({
                Component: LoanDetails,
                modalConfig: {
                    ...defaultModalConfig,
                    handleClose: handleCloseModal,
                    show: showModal,
                },
                componentProps: { 
                    hideControls: true,
                    loan: { book: selectedBook}
                }
            })}
        </Row>
        </>
    )
}
