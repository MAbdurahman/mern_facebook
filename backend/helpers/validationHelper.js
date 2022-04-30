const User = require('./../models/userModel');

exports.validateEmail = email => {
	return String(email)
		.toLowerCase()
		.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
exports.validateLength = (text, min, max) => {
	if (text.length > max || text.length < min) {
		return false;
	}
	return true;
};
exports.validateUsername = async username => {
	let isValidUsername = false;

	do {
		let tempUsername = await User.findOne({ username });
		if (tempUsername) {
			//************* if tempUserName, randomize username *************//
			username += (+new Date() * Math.random()).toString().substring(0, 1);
			isValidUsername = true;
		} else {
			isValidUsername = false;
		}
	} while (isValidUsername);
	return username;
};