const {Book, Author} = require('../models');
const author = require('../models/author');


module.exports =  {
    async addBook(book) {
        const {authorName, ...newBook} = book;

        try {
            let author = await Author.findOne({where: { name: authorName}});

            if(!author) {
                author =  await Author.create({name: authorName});
            }

            newBook.authorId = author.id;

            const createdBook = await Book.create(newBook);

            return {
                book: createdBook.toJSON(),
                message: 'Book Created Successfully',
                error: false,
            };
        } catch(error) {
            return {
                message: error.message,
                error: true,
            };
        }
    },
    async getAllBooks() {
        try {
            const books = await Book.findAll()
              return {
                  books,
                  message: 'Book fetched successfully',
                  error: false,
              };
          } catch(error) {
              return {
                  message: error.message,
                  error: true,
              };
          }
    },
    async deleteBook(bookId) {
        try {
             await Book.destroy({where: {id: bookId}});

              return {
                  message: 'Book deleted successfully',
                  error: false,
              };
          } catch(error) {
              return {
                  message: error.message,
                  error: true,
              };
          }
    },
    async editBook(book) {
        const {id: bookId, ...rest } = book;
        try {
            const existingBook = await Book.findOne({ where: { id: bookId}})

            existingBook.set(rest);
            const transaction = await existingBook.save()
            return {
            book: transaction,
            message: 'Book deleted successfully',
            error: false,
            };
         } catch(error) {
             return {
                 message: error.message,
                 error: true,
             };
         }
    }
}