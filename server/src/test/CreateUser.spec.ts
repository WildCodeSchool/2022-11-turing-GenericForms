import { faker } from '@faker-js/faker';
require('isomorphic-fetch');

test('CreateUser', async () => {
    const expected = {
        "email": faker.internet.email(),
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName(),
        "role": "test",
    }
    return await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'query': 'mutation CreateUser($createUserInput: CreateUserInput!) {\n  createUser(createUserInput: $createUserInput) {\n    userId\n    email\n    password\n    firstName\n    lastName\n    role\n    createdAt\n    updatedAt\n  }\n}',
            'variables': {
                'createUserInput': {
                    'email': expected.email,
                    'firstName': expected.firstName,
                    'lastName': expected.lastName,
                    'password': faker.internet.password(),
                    'role': 'test'
                }
            }
        })
    })
        .then(async res => await res.json())
        .then(res => compare(res.data.createUser));

    function compare(res: any): void {
        expect(res.email).toEqual(expected.email);
        expect(res.firstName).toEqual(expected.firstName);
        expect(res.lastName).toEqual(expected.lastName);
        expect(res.role).toEqual(expected.role);
    }

});