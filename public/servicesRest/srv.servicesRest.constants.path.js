(function () {
    'use strict';
    angular.module('servicesRestModule')
        .constant('path', {
            PRUEBA_USERS: 'http://localhost:8080/miruta/users',
            GET_TOKEN_AUTH: 'http://localhost:8080/login'
        });
})()