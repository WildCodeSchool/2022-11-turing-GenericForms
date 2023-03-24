import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    gql,
  } from "@apollo/client/core";
import fetch from "cross-fetch";
  

const client = new ApolloClient({
    link: new HttpLink({
    uri: "http://api:4000",
        fetch,
    }),
    cache: new InMemoryCache(),
});

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

const READ_USERS_TEST = gql`
    query ReadUsers {
        readUsers {
            firstName
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

describe("User Resolver", () => {
    it("Users are empty", async () => {
    const res = await client.query({
        query: READ_USERS,
        fetchPolicy: "no-cache",
    });
    expect(res.data?.readUsers).toEqual([]);
    });

    it("Users contain new user", async () => {
    await client.mutate({
        mutation: CREATE_USER,
        variables: {
            createUserInput: {
                email: "demo@gmail.com",
                firstName: "demo",
                lastName: "demo",
                password: "demo",
            },
        },
    });

    const res = await client.query({
        query: READ_USERS_TEST,
        fetchPolicy: "no-cache",
    });

    expect(res.data?.readUsers).toEqual([{__typename: "User", firstName: "demo" }]);
    });
});
  