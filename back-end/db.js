const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'pestotech',
	};
	try {
		mongoose.connect('mongodb+srv://simrantandon2801:Simran_786@cluster0.sssfqqs.mongodb.net/?retryWrites=true&w=majority', connectionParams); // database ki value kya h jaise atlas local pr h konsa database connected
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		
	}
};