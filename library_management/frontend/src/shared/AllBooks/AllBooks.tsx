import React, { FC, useEffect, useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import { IBook } from '../../../../models';
import Api from '../../api';

import {Book} from '..';
import { Section } from '../Section/Section';
import { fetchAllBooks } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
    showBookDetails: (arg: IBook) => any;
    refetch?: boolean;
    adminView?: boolean;
    borrow: (arg: IBook) => any;
    editBook?: (arg: IBook) => any;
}


export const AllBooks: FC<Props> =  ({ showBookDetails, refetch, adminView, borrow, editBook })  => {
    const [books, setBooks] = useState<IBook[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        fetchAllBooks({setBooks, setIsLoading, setError})
    }, []);
    useEffect(() => {
        if (refetch) {
            fetchAllBooks({setBooks, setIsLoading, setError});
        }
    }, [refetch, books]);


    const deleteMe = async (book: IBook) => {
        Api.deleteBook(book.id)
            .then(()=> {
                setBooks(prevBooks=> prevBooks.filter(nextBook => book.id !== nextBook.id ))
            });
    }

    return (
        <Section
            dimensions={{
                sm:12,
                md:8
            }}
            title="All Books"
        >
        <Row>
            {
                isLoading?
                    <Col>
                        <Alert variant="info">Loading ....</Alert>
                        <FontAwesomeIcon icon={faTimes} onClick={() => setIsLoading(false)}/>
                    </Col> 
                    :
                    null
            }
             {
                isLoading?
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                        <FontAwesomeIcon icon={faTimes} onClick={() => setError('')}/>
                    </Col> 
                    :
                    null
            }

            {
                !isLoading ? <>
                {books.map((book, i) => (
                    <Col xs={12} sm={6} lg={4} className="mb-3" key={i}>
                        <Book
                            borrow={borrow}
                            isAdmin={adminView}
                            book={book}
                            showBook={() => showBookDetails(book)}
                            deleteBook={() => deleteMe(book)}
                            editBook={() => editBook && editBook(book)}
                        />
                    </Col>
                ))}
                </>
                : null
            }
        </Row> 
    </Section>
    )
}
