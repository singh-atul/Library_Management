import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Alert, Button, Row } from 'react-bootstrap'
import {FormState, IBook, ILoan } from '../../../../models';
import Api from '../../api';
import { AllBooks, BorrowedBooks } from '../../shared';
import LoanDetails from '../../shared/LoanTable/LoanDetails';
import { Section } from '../../shared/Section/Section';
import BookForm from './components/BookForm/BookForm';
import withModal from '../../shared/HOCs/withModal';
import { defaultModalConfig } from '../../constants';

 const AdminPortal: FC<{isAdmin: boolean, userId: number}> = ({isAdmin, userId}) => {
     const [isLoading, setIsLoading] = useState(true);
    const [loans, setLoans] = useState<Partial<ILoan>[]>([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Partial<IBook>>();
    const [isBookFormOpen, setIsBookFormOpen] = useState(false)
    const [refetchBooks, setRefetchBooks] = useState(false)
    const [addBookState, setAddBookState]  = useState<FormState>('pristine')
    const [shouldFetchLoans, setShouldFetchLoans] = useState(true);
    const [shouldShowLoan, setShouldShowLoan]  = useState(false);
    const [loan, setLoan] = useState<Partial<ILoan>>();
    const [successMessage, setSuccessMessage] = useState('');
    const [modalConfig, setModalConfig] = useState({ ...defaultModalConfig })

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (fullBook: IBook) => {
        setShowModal(true);
        setSelectedBook(fullBook);
    };

    const approveLoan = useCallback(async (loan: ILoan) => {
        try {   
           await Api.approveLoan(loan.id!);

           setShouldFetchLoans(true);
        } catch(e) {
            setError(e.message)
        } finally {

           setShouldFetchLoans(false); 
        }
    }, []);

    const handleBookAddition = useCallback(async (e: React.SyntheticEvent<Element, Event>, book: Partial<IBook>) => {
        e.preventDefault();

        try {
            if(book.id) {
                await Api.editBook(book as IBook);
            } else {
                await Api.addBook(book as IBook);
            }

            setAddBookState('submitted');
            setIsBookFormOpen(false);
            setRefetchBooks(() => true);
            setRefetchBooks(() => false)
        } catch(e) {
            setError(e.message);
            setAddBookState('error');
            setRefetchBooks(() => false);
        } 
    }, [])

    useEffect(() => {
        if(shouldFetchLoans) {
            Api.getBorrows()
            .then(({data}) => {
                setLoans(data.loans)
                setIsLoading(false)
                setAddBookState('submitted')
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
                setAddBookState('error')
            }).finally(() => setShouldFetchLoans(false));
        }
    }, [shouldFetchLoans]);

    const borrowBook = (book: IBook) => {
        Api.createLoan({
            userId,
            bookId: book.id,
            days: 7,
        }).then(({data}) => {
            setShouldFetchLoans(!data.error);
            if(data.error) {
                setError(data.message)
            }
        })
        .catch(error => {
            setError(error.message)
        } );
    }

    const showLoan = useCallback((loanToShow: Partial<ILoan>) => {
        setShouldShowLoan(true);
        setLoan(loanToShow);
    }, [])


    const notifyToReturn = useCallback((loan: ILoan) => {
        const notification = {
            userId: loan.userId,
            title: `Book Return Reminder`,
            details: `Book: ${loan.book.title}`
        };


        Api.notifyUserToReturnBook(notification)
            .then(() => {
                setSuccessMessage('Notifications sent successfully')
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setShouldShowLoan(false)
            }) ;
    }, []);
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
            }).finally(() => {
                setShouldShowLoan(false)
            })
    }, []);

    const editBook = useCallback((book: IBook) => {
        setSelectedBook(book);
        setModalConfig(currConfig => ({ 
            ...currConfig,
            show: true,
            title: book.title
        }))
    }, []);

    const openBookForm = useCallback(() => {
        setSelectedBook({} as IBook);
        setIsBookFormOpen(true);
        setModalConfig(currConfig => ({ 
            ...currConfig,
            show: true,
            title: 'Add New Book'
        }))
    }, []);

    const closeLoanDetails = useCallback(() => {
        setShouldShowLoan(false);
    }, []);

    const closeBookForm = useCallback(() => {
        setIsBookFormOpen(false);
        setSelectedBook({});
    }, []);

    return ( 
    <>
        <Row>
            <Section title="" dimensions={{xs: 12, sm: 3}}>
                <Button
                    size="lg"
                    variant="primary" 
                    onClick={openBookForm}>
                        Add New Book
                </Button>
            </Section>
            <Section title="Books And Loans Managed Here" dimensions={{xs: 12, sm: 8}}>

                {error? <Alert variant="warning">{error}</Alert>: null}
                {isLoading? <Alert variant="info">Loading....</Alert>: null}
                {successMessage?
                    <Alert variant="info">
                        {successMessage}
                        <FontAwesomeIcon onClick={() => setSuccessMessage('')} icon={faTimes} /> 
                    </Alert>: null}

            </Section>
        </Row>
        <Row className="ml-0 mr-0 border">
            <BorrowedBooks
                isAdmin={isAdmin}
                borrows={loans as ILoan[]}
                showLoan={showLoan}
            />
            <AllBooks
                adminView={isAdmin}
                showBookDetails={handleShowModal}
                editBook={editBook}
                refetch={refetchBooks}
                borrow={borrowBook}
            />

            <>
            {withModal({
                Component: LoanDetails,
                componentProps: {
                    loan,
                    isAdmin,
                    completeLoan,
                    approveLoan,
                    notifyToReturn
                },
                modalConfig: {
                    ...modalConfig,
                    show: shouldShowLoan,
                    handleClose: closeLoanDetails,
                    title: loan?.book?.title!,
                }
            })
            }
            </>

            <>
                {withModal({
                    Component: LoanDetails,
                    componentProps: {
                        hideControls:true,
                        loan: {book: selectedBook  as ILoan}
                    },
                    modalConfig: {
                        ...modalConfig,
                        handleClose: handleCloseModal,
                        title: selectedBook?.title!,
                        show: showModal,
                        size: 'lg',
                        controls: 'closeOnly',
                
                    },
                })}
            </>

            <>
                {withModal({
                    Component: BookForm,
                    modalConfig: {
                        ...modalConfig,
                        show: isBookFormOpen,
                        handleClose: closeBookForm,
                    },
                    componentProps: {
                        formState: addBookState,
                        selectedBook: selectedBook,
                        error: error,
                        handleSubmit: (
                            e: React.SyntheticEvent<Element, Event>,
                            book: Partial<IBook>
                        ) => handleBookAddition(e, book)
                    }
                })}
            </>
        </Row>
        </>
    )
}


export default AdminPortal;
