const { GraphQLScalarType } = require('graphql');

const userResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string data e hora no formato ISO-8601',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),

    answerCustom: {
        __resolveType(obj, context, info) {
            return false;
        }
    },

    RolesType: {
        ESTUDANTE: 'ESTUDANTE',
        DOCENTE: 'DOCENTE',
        COORDENACAO: 'COORDENACAO'
    },

    Query: {
        users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    },

    Mutation: {
        addUser: (root, { user }, { dataSources }) => dataSources.usersAPI.addUser(user),
        updateUser: (root, newUser, { dataSources }) => dataSources.usersAPI.updateUser(newUser),
        deleteUser: (root, { id }, { dataSources }) => dataSources.usersAPI.deleteUser(id)
    }
};

module.exports = userResolvers;
