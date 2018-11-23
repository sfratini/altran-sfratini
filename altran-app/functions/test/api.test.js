const request = require('supertest');
const app = require('../app')
const find = require('../middleware/index').find;
const endpoints = require('../config/endpoints');
const fetch = require('node-fetch');

describe('Find', () => {

    test('It should return an error', () => {
        return find(fetch, "none", "root", null)
        .then((response) => {
            
        })
        .catch(err => {
            expect(err).toBeDefined();
        })
        
    });

    test('It should return null if root is not found', () => {
        return find(fetch, endpoints.users, "root", null)
        .then((response) => {
            
        })
        .catch(err => {
            expect(err).toBeNull()
        })
        
    });

    test('It should return one single object', () => {

        let logic = possibleClient => {
            return true;
        };
        return find(fetch, endpoints.users, "clients", logic)
        .then((response) => {
            expect(response).toBeDefined();
        });
        
    });

    test('It should return a list', () => {

        let logic = possible => {
            return possible.clientId === "a0ece5db-cd14-4f21-812f-966633e7be86";
        };
        return find(fetch, endpoints.policies, "policies", logic, true)
        .then((response) => {
            expect(response).toBeDefined();
            expect(response).toHaveLength(102);
        });
        
    });

});

describe('User by ID', () => {

    test('It should require a user header', () => {
        return request(app).get('/v1/user/id/a0ece5db-cd14-4f21-812f-966633e7be86')
        .then((response) => {
            expect(response.statusCode).toBe(401);
            expect(response.body.status.statusCode).toBe(401);
        });
    });

    test('It should tell when no user is found', () => {
        return request(app).get('/v1/user/id/none')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(404);
            expect(response.body.status.statusCode).toBe(404);
        });
    });

    test('It should be accessed by user role', () => {
        return request(app)
        .get('/v1/user/id/a0ece5db-cd14-4f21-812f-966633e7be86')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.name).toBeDefined();
            expect(response.body.data.email).toBeDefined();
            expect(response.body.data.role).toBeDefined();
        });
    });

    test('It should be accessed by admin role', () => {
        return request(app)
        .get('/v1/user/id/a0ece5db-cd14-4f21-812f-966633e7be86')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.name).toBeDefined();
            expect(response.body.data.email).toBeDefined();
            expect(response.body.data.role).toBeDefined();
        });
    });

});

describe('User by Name', () => {

    test('It should require a user header', () => {
        return request(app).get('/v1/user/name/Barnett')
        .then((response) => {
            expect(response.statusCode).toBe(401);
            expect(response.body.status.statusCode).toBe(401);
        });
    });

    test('It should tell when no user is found', () => {
        return request(app).get('/v1/user/name/none')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(404);
            expect(response.body.status.statusCode).toBe(404);
        });
    });

    test('It should be accessed by user role', () => {
        return request(app)
        .get('/v1/user/name/Barnett')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.name).toBeDefined();
            expect(response.body.data.email).toBeDefined();
            expect(response.body.data.role).toBeDefined();
        });
    });

    test('It should be accessed by admin role', () => {
        return request(app)
        .get('/v1/user/name/Barnett')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.name).toBeDefined();
            expect(response.body.data.email).toBeDefined();
            expect(response.body.data.role).toBeDefined();
        });
    });

});

describe('User Policies', () => {

    test('It should require a user header', () => {
        return request(app).get('/v1/user/name/Barnett/policies')
        .then((response) => {
            expect(response.statusCode).toBe(401);
            expect(response.body.status.statusCode).toBe(401);
        });
    });

    test('It should tell if the user is not found', () => {
        return request(app)
        .get('/v1/user/name/none/policies')
        .set("x-user", "Britney")
        .then((response) => {
            expect(response.statusCode).toBe(404);
            expect(response.body.status.statusCode).toBe(404);
        });
    });

    test('It should return an empty array if no policies are found', () => {
        return request(app).get('/v1/user/name/Whitley/policies')
        .set("x-user", "Britney")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data).toHaveLength(0);
        });
    });

    test('It should not be accessed by user role', () => {
        return request(app)
        .get('/v1/user/name/Barnett/policies')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(403);
            expect(response.body.status.statusCode).toBe(403);
        });
    });

    test('It should be accessed by admin role', () => {
        return request(app)
        .get('/v1/user/name/Manning/policies')
        .set("x-user", "Britney")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data).toHaveLength(91);
            
        });
    });

});

describe('User by Policy', () => {

    test('It should require a user header', () => {
        return request(app).get('/v1/policy/123/user')
        .then((response) => {
            expect(response.statusCode).toBe(401);
            expect(response.body.status.statusCode).toBe(401);
        });
    });

    test('It should tell if the policy is not found', () => {
        return request(app)
        .get('/v1/policy/123/user')
        .set("x-user", "Britney")
        .then((response) => {
            expect(response.statusCode).toBe(404);
            expect(response.body.status.statusCode).toBe(404);
        });
    });

    test('It should not be accessed by user role', () => {
        return request(app)
        .get('/v1/policy/123/user')
        .set("x-user", "Barnett")
        .then((response) => {
            expect(response.statusCode).toBe(403);
            expect(response.body.status.statusCode).toBe(403);
        });
    });

    test('It should be accessed by admin role', () => {
        return request(app)
        .get('/v1/policy/64cceef9-3a01-49ae-a23b-3761b604800b/user')
        .set("x-user", "Britney")
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.status.statusCode).toBe(200);
            expect(response.body.data).toBeDefined();
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.name).toBeDefined();
            expect(response.body.data.email).toBeDefined();
            expect(response.body.data.role).toBeDefined();
            
        });
    });

});

