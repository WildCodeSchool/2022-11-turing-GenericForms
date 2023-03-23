import {gql, ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import {UserResolver} from './index';
import datasource from '../../lib/datasource';


beforeEach(async () => {
    await datasource.initialize();
    await datasource.dropDatabase();
    await datasource.synchronize();
});

let apolloServer = async () =>  {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        validate: false,
    });
    const server = new ApolloServer({
        schema,
        context: () => {
            return {user: {email: "demo@gmail.com"}};
        },
    });
    return server;
};

const READ_USERS = gql`
    query ReadUsers {
        readUsers {
            userId
            firstName
            lastName
            password
            email
            createdAt
            updatedAt
            role
            forms {
                formId
            }
        }
    }
`;

const CREATE_USER = gql`
    mutation Mutation($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            firstName
        }
    }
`;

test("Insert user", async () => {
    const server = await apolloServer();
    server.start();

    console.log("server démarré ==>", server);

    await server.executeOperation({
        query: CREATE_USER,
        variables: {
            createUserInput: {
                email: "test@test.fr",
                firstName: "test",
                lastName: "test",
                password: "test",
            },
        },
    });
    // let result = await server.executeOperation({query: READ_USERS});
    // let users = result?.data?.readUsers;
    
    // expect(users.length).toBe(1);
    // expect(users[0].email).toEqual("test@test.fr");
    
});
