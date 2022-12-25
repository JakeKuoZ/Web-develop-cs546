const {
  checkUserEmpty,
  checkUserForUsername,
  checkUserForUniqueUserName,
  checkUserForPassword,
} = require("../helpers");
const {
  user_collection
} = require("../config/mongoCollections");
const bcrypt = require("bcrypt");

const createUser = async (
  username, password
) => {
  checkUserEmpty(username, password);
  checkUserForUsername(username);
  await checkUserForUniqueUserName(username);
  await checkUserForPassword(password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user_collection_modle = await user_collection();
  try {
    await user_collection_modle.insertOne({
      username,
      password: hashedPassword
    });
    return {
      insertedUser: true
    }
  } catch (error) {
    throw new Error('Internal Server Error!');
  }
};

const checkUser = async (username, password) => {
  checkUserEmpty(username, password);
  checkUserForUsername(username);
  await checkUserForPassword(password);
  const user_collection_modle = await user_collection();
  const user = await user_collection_modle.findOne({
    username: {
      $regex: new RegExp(username, "i")
    }
  });
  if (!user) {
    throw new Error('Either the username or password is invalid!');
  }
  try {
    await new Promise((resolve, reject) => {
      bcrypt
        .compare(password, user.password).then((passwordCheck) => {
          if (!passwordCheck) {
            reject("Either the username or password is invalid!");
            return;
          }
          resolve();
        })
    })
    return {
      authenticatedUser: true
    }
  } catch (error) {
    throw new Error('Either the username or password is invalid!');
  }

};

module.exports = {
  createUser,
  checkUser
};