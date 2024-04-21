const User = require('../models/userModel');

async function userLogin(user) {
  const { username, password } = user;

  if (!username || !password)
    throw new Error('Username and password are required');

  const findUser = await User.findOne({ username });

  if (!findUser) throw new Error('User not found');

  const isMatch = await findUser.comparePassword(password);

  if (!isMatch) throw new Error('Invalid password or login');
}

module.exports = userLogin;
