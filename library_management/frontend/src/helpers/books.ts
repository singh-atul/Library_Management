import { IBook } from '../../../models';
import Api from '../api'

export const fetchAllBooks = (stateSetters: {
    setIsLoading: (arg: boolean) => any;
    setError: (arg: string) => any;
    setBooks: (arg: IBook[]) => any;
}) => { 
    return Api.getAllBooks()
    .then(({data}) => {
            stateSetters.setIsLoading(false);
            stateSetters.setBooks(data.books);
        })
        .catch(error => {
            stateSetters.setIsLoading(false);
            stateSetters.setError(error.message)
        });
}
