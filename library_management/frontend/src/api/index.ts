import axios from 'axios';
import {IBook, ILoan, INotification, IUser} from '../../../models';

class ApiFacade {
	private apiBaseUrl =
		process.env.NODE_ENV === 'production'
			? '/api'
			: 'http://localhost:8080/api';

	getAllBooks() {
		return axios({
			url: `${this.apiBaseUrl}/books`,
			method: 'get',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	getBorrows() {
		return axios({
			url: `${this.apiBaseUrl}/loans`,
			method: 'get',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	createLoan(loan: {userId: number; bookId: number; days: number}) {
		return axios({
			url: `${this.apiBaseUrl}/loans`,
			method: 'post',
			data: loan,
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	addBook(book: IBook) {
		return axios({
			url: `${this.apiBaseUrl}/books`,
			method: 'POST',
			data: book,
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	editBook(book: IBook) {
		return axios({
			url: `${this.apiBaseUrl}/books`,
			method: 'PUT',
			data: book,
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	completeLoan(loan: ILoan) {
		return axios({
			url: `${this.apiBaseUrl}/loans/${loan.id}`,
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	signup(user: Partial<IUser>) {
		return axios({
			url: `${this.apiBaseUrl}/auth/signup`,
			method: `POST`,
			data: user,
		});
	}

	login(user: Partial<IUser>) {
		return axios({
			url: `${this.apiBaseUrl}/auth/login`,
			method: `POST`,
			data: user,
		});
	}

	deleteBook(bookId: number) {
		return axios({
			url: `${this.apiBaseUrl}/books/${bookId}`,
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	fetchNotifications() {
		return axios({
			url: `${this.apiBaseUrl}/notifications/me`,
			method: 'GET',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	notifyUserToReturnBook(notification: Omit<INotification, 'id'>) {
		return axios({
			url: `${this.apiBaseUrl}/notifications`,
			method: 'POST',
			data: notification,
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	deleteNotification(notificationId: number) {
		return axios({
			url: `${this.apiBaseUrl}/notifications/${notificationId}`,
			method: 'DELETE',
			headers: {
				authorization: localStorage.getItem('token'),
			},
		});
	}

	approveLoan(loanId: number) {
		return axios({
			url: `${this.apiBaseUrl}/loans/${loanId}/approval`,
			method: 'PATCH',
			headers: {
				authorization: localStorage.getItem('token')
			}
		});
	}
}

export default new ApiFacade();
