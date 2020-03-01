var express = require('express');
var router = express.Router();

const keycloak = require('../keycloak-module');


function protectBySection(token, request) {
    return token.hasRole(request.params.section);
}

router.get('/:account_id/roles', keycloak.keycloak.enforcer('account-roles:role-view',
      {//response_mode: 'token'
        claims: function (request) {
          return {
            'ctx.account_id': [request.params.account_id]
          }
        }
      }),
      function (req, res, next) {
    res.send(`all roles. account: ${req.params.account_id}`);
});


router.get('/:account_id/roles/:role_id', keycloak.keycloak.enforcer('account-roles:role-assign', {response_mode: 'token'}), function (req, res, next) {
    res.send(`account: ${req.params.account_id}, role_id: ${req.params.role_id}`);
});

router.post('/', function (req, res) {
    res.send('Got a POST request, yep')
})

module.exports = router;