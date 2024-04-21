const User = require('../models/userModel');

async function userCreate(user) {
  const userExists = await User.find();

  if (userExists.length) throw new Error('User already exists');

  const newUser = new User.create({
    username: user.username,
    password: user.password,
  });

  return newUser;
}
module.exports = userCreate;
