const persistThisContext  = require('../helpers/persist-this-context');
const {Loan, Book, User} = require('../models');

const loanController = {
	async getAllLoans (){
		try {
			const loans = await Loan.findAll();

			if (loans) {
				const bookLoans = await this.getLoanRelations(loans);

				return {
					loans: bookLoans,
					message: 'loans fetched successfully',
					error: false,
				};
			} else {
				return {
					message: 'Could not fetch book loans',
					error: true,
				};
			}
		} catch (e) {
			return {
				message: e.message,
				error: true,
			};
		}
	},
	getLoanRelations(loans){
		return Promise.all(
			loans.map(async (loan) => {
				const book = await Book.findOne({where: {id: loan.bookId}});
				const user = await User.findOne({where: {id: loan.userId}});
				const newLoan = loan.toJSON();

				newLoan.book = book;
				newLoan.user = user;

				return newLoan;
			}),
		);
	},

	getUserLoans: async (user)  => {
		try {
			const loans = await Loan.findAll({where: {userId: user.id}});

			if (loans) {
				const bookLoans = await this.getLoanRelations(loans, user);
				return {
					loans: bookLoans,
					message: 'loans fetched successfully',
					error: false,
				};
			} else {
				return {
					message: 'Could not fetch book loans',
					error: true,
				};
			}
		} catch (e) {
			return {
				message: 'Something went wrong',
				error: true,
			};
		}
	},

	async createLoan(loan) {
		try {
			const createdLoan = await Loan.create(loan);

			return {
				loan: createdLoan,
				message: 'loan created successfully',
				error: false,
			};
		} catch (e) {
			return {
				message: 'Something went wrong',
				error: true,
			};
		}
	},

	async approveLoan(loanId) {
		try {
			const loan = await Loan.findOne({ where: { id: loanId }});
			loan.approvedOn = new Date();
			await loan.save();

			return {
				loan,
				message: 'Loan approved successfully',
				error: false,
			};
		} catch(e) {
			return {
				message: e.message,
				error: true,
			};
		}
	},

	async completeLoan(loanId) {
		try {
			await Loan.destroy({where: {id: loanId}});

			return {
				message: 'loan deleted successfully',
				error: false,
			};
		} catch (e) {
			return {
				message: 'Something went wrong',
				error: true,
			};
		}
	},
};


module.exports = persistThisContext(loanController);
