const {Router} = require('express');
const loanController = require('../controllers/loan');
const isAdmin = require('../helpers/is-admin');
const respond = require('../helpers/response-helper');
const router = Router();

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

router.get('/', (req, res) => {
	const {user} = req;

	if(isAdmin(user)) {
		
		return respond(res)
			.using(loanController.getAllLoans)
			.withPayload();
	}

	return respond(res)
		.using(loanController.getUserLoans)
		.withPayload(user.user);

});

router.post('/', async (req, res) => {
	const {
		body: {days, ...loan},
	} = req;
	const date = new Date().addDays(days);
	loan.expiredOn = date;

	respond(res)
		.using(loanController.createLoan)
		.withWithPayload(loan);
});

router.patch('/:id/approval', async (req, res) => {
	const {id} = req.params;

	return respond(res)
		.using(loanController.approveLoan)
		.withPayload(id);
});

router.delete('/:id', async(req, res) => {
	const { id } = req.params;

	return respond(res)
		.using(loanController.completeLoan)
		.withPayload(id);
});

module.exports = router;
