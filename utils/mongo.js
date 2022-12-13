const USERNAME = 'react-course';
const PASSWORD = process.env.MONGO_PWD;

export const DB_URL =
	'mongodb+srv://' +
	USERNAME +
	':' +
	PASSWORD +
	'@cluster0.hpxjkxe.mongodb.net/?retryWrites=true&w=majority';
