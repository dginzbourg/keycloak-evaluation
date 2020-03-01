var express = require('express');
var router = express.Router();

const keycloak = require('../keycloak-module');


function protectBySection(token, request) {
    return token.hasRole(request.params.section);
}

router.get('/:account_id/extensions', keycloak.keycloak.enforcer('extensions:extensions-view',
      {//response_mode: 'token'
        claims: function (request) {
          return {
            'ctx.account_id': [request.params.account_id]
          }
        }
      }),
      function (req, res, next) {
    res.send(`view any extensions. account: ${req.params.account_id}`);
});


router.get('/:account_id/extensions/:ext_id', keycloak.keycloak.enforcer('extensions:extensions-view', {response_mode: 'token'}), function (req, res, next) {
    res.send(`view account: ${req.params.account_id}, ext_id: ${req.params.ext_id}`);
});

router.post('/:account_id/extensions', keycloak.keycloak.enforcer('extensions:extensions-manage', {response_mode: 'token'}), function (req, res, next) {
    res.send(`create new ext account: ${req.params.account_id}`);
})

module.exports = router;