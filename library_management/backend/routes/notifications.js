const {Router} = require('express');
const notificationController = require('../controllers/notifications');
const adminAuthMiddleware = require('../custom-middleware/admin-auth-middleware');
const router = Router();

router.get('/me', async (req, res) => {
	const {user} = req.user;
	try {
		const result = await notificationController.getMyNotifications(user.id);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({error: true, message: 'something went wrong'});
	}
});

router.post('/', adminAuthMiddleware, async (req, res) => {
	try {
		const result = await notificationController.createNotifications(req.body);

		return res.status(200).json(result);
	} catch (error) {
		return res.status(500).json({error: true, message: 'something went wrong'});
	}
});

router.delete('/:id', async (req, res) => {
	const result = await notificationController.deleteNotification(req.params.id);

	if (!result.error) {
		return res.json(result);
	}

	return res.status(500).json(result);
});

module.exports = router;
