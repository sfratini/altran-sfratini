let roles = {
    admin: {
        can: ['policy:read'],
        inherits: ['user']
    },
    user: {
        can: ['user:read']
    }
}

module.export = roles;