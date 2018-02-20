(function () {
    'use strict';
    angular.module('routes')
        .constant('path', {
            LOGIN_VIEW: '/public/partial/login_register/loginView.html',
            REGISTER_VIEW: '/public/partial/login_register/registerView.html',
            HOME_VIEW: '/public/partial/home/homeView.html',
            RECORRIDO_VIEW: '/public/partial/recorrido/recorridoView.html',
            TRANSPORTES_VIEW: '/public/partial/transportes/transportesView.html',
            PTOINTERES_VIEW: '/public/partial/ptoInteres/ptoInteresView.html',
            ADMIN_LOGIN_VIEW: '/public/admin/partial/adminLoginView.html',
            ADMIN_HOME_VIEW: '/public/admin/partial/adminHomeView.html',
            ADMIN_RECORRIDO_VIEW: '/public/admin/partial/adminRecorridoView.html',
            ADMIN_TRANSPORTE_VIEW: '/public/admin/partial/adminTransportesView.html',
            ADMIN_PTOINTERES_VIEW: '/public/admin/partial/adminPtoInteresView.html'
        });
})()