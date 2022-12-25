//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const {
    user_collection
} = require("./config/mongoCollections");

const checkUserEmpty = (
    username, password
) => {
    if (!username) {
        throw new Error('username is empty!');
    }
    if (!password) {
        throw new Error('password is empty!');
    }
};
const checkUserForUsername = (
    username
) => {
    if (/\s+/g.test(username)) {
        throw new Error('username have spaces!');
    }
    if (username.length < 4) {
        throw new Error('username should be at least 4 characters long!');
    }
    if (!/^[\da-z]+$/i.test(username)) {
        throw new Error('username only alphanumeric characters!');
    }
};

const checkUserForUniqueUserName = async (username) => {
    const user_collection_modle = await user_collection();
    const result = await user_collection_modle.findOne({
        username: {
            $regex: new RegExp(username, "i")
        }
    });
    if (result) {
        throw new Error('there is already a user with that username!');
    }
}

const checkUserForPassword = (
    password
) => {
    if (/\s+/g.test(password)) {
        throw new Error('password have spaces!');
    }
    if (password.length < 6) {
        throw new Error('password should be at least 6 characters long!');
    }
    const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{6,}$/;
    if (!passwordReg.test(password)) {
        throw new Error(`There needs to be at least one
        uppercase character, there has to be at least one number and there has to be
    at least one special character!`);
    }
};

module.exports = {
    checkUserEmpty,
    checkUserForUsername,
    checkUserForPassword,
    checkUserForUniqueUserName,

};