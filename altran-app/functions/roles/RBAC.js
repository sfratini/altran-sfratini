class RBAC {
    constructor(roles) {
        if(typeof roles !== 'object') {
            throw new TypeError('Expected an object as input');
        }
        this.roles = roles;
    }
  
    can(role, operation) {

        if(!this.roles[role]) {
            return false;
        }
        let $role = this.roles[role];

        if($role.can.indexOf(operation) !== -1) {
            return true;
        }

        if(!$role.inherits || $role.inherits.length < 1) {
            return false;
        }
      
        return $role.inherits.some(childRole => this.can(childRole, operation));
    }
}

module.exports = RBAC;