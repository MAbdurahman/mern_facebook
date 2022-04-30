const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {
	validateEmail,
	validateLength,
	validateUsername,
} = require('../helpers/validationHelper');
const { generateToken } = require('../utils/generateTokenUtils');

exports.register = async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body;

		if (!validateEmail(email)) {
			return res.status(400).json({
				message: 'Invalid email address',
			});
		}
		const check = await User.findOne({ email });
		if (check) {
			return res.status(400).json({
				message: 'Email already exists, try a different email',
			});
		}

		if (!validateLength(first_name, 2, 32)) {
			return res.status(400).json({
				message: 'First name must between 2 and 32 characters.',
			});
		}
		if (!validateLength(last_name, 2, 32)) {
			return res.status(400).json({
				message: 'Last name must between 2 and 32 characters.',
			});
		}
		if (!validateLength(password, 8, 32)) {
			return res.status(400).json({
				message: 'Password must be between 8 and 32 characters.',
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 12);
		let tempUsername = first_name + last_name;
		const newUsername = await validateUsername(tempUsername);


		const user = await new User({
			first_name,
			last_name,
			email,
			password: encryptedPassword,
			username: newUsername,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();

      const emailVerificationToken = generateToken(
			{ id: user._id.toString() },
			'30m'
		);
		console.log(emailVerificationToken);

		res.json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
