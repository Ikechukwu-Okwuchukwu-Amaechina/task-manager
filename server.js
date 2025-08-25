

const app = require('./app');

// Default port can be overridden by setting PORT in the environment.
const PORT = process.env.PORT || 3000;


if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
	});
}

module.exports = app;
