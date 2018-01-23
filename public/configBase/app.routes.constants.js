(function () {
    'use strict';
    angular.module('routes')
        .constant('path', {
            LOGIN_VIEW: '/public/partial/login_register/loginView.html',
            REGISTER_VIEW: '/public/partial/login_register/registerView.html',
            RECORRIDO_VIEW: '/public/partial/recorrido/recorridoView.html',
            HOME_VIEW: '/public/partial/home/homeView.html',
            ADMIN_VIEW: '/public/admin/partial/adminView.html',
            ADMIN_RECORRIDO_VIEW: '/public/admin/partial/recorrido/recorridoView.html'
        });
})()