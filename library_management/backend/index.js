const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes/');
const useAuth = require('./custom-middleware/auth-middleware');

require('dotenv').config();

const sequelize = require('./sequelize/sequelize');

(async () => {
	try {
		await sequelize.authenticate();
		console.log('DATABASE AUTHENTICATED SUCCESSFULLY 🚀');
	} catch (e) {
		console.error('UNABLE TO CONNECT TO THE DATABASE 😥', e);
	}
})();

const app = express();
const PORT = process.env.PORT || 8080;
const PRIVATE_IP = process.env.PRIVATE_IP;

app.use(express.static(path.join(__dirname, '../../', 'lls-frontend/build')));

app.use(cors());
app.use(express.json());

app.use('/api/auth', routes.userRoutes);
app.use('/api/books', useAuth, routes.bookRoutes);

app.use('/api/loans', useAuth, routes.loans);
app.use('/api/notifications', useAuth, routes.notifications);

app.get('*', (_, res) => {
	return res.sendFile(
		path.resolve(__dirname, '../../', 'lls-frontend/build/index.html'),
	);
});

app.listen(PORT, '0.0.0.0', () =>
	console.log(`App running on port: ${PORT} 🚀`),
);

if (PRIVATE_IP) {
	app.listen(PORT, PRIVATE_IP, () =>
		console.log(`App running on port: ${PORT} 🚀`),
	);
}
