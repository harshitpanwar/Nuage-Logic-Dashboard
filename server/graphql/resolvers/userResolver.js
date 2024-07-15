const userService = require('../services/userService');

const userResolvers = {
    Query: {
        login: async (_, { email, password }) => {
            return userService.login(email, password);
        },
        me: async (_, __, {user}) => {
            if(!user) throw new Error("Unauthorized");
            return userService.getUserById(user._id);
        }
    },
    Mutation: {
        createUser: async (_, input, {user}) => {
            return userService.createUser(user._id);
        }
    }
};

module.exports = userResolvers;
