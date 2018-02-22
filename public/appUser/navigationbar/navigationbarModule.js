/* componente que representa el encabezado(llamado desde la vista por la directiva con su mismo nombre) con
    partial correspondiente */

(function () {
    'use strict';
    angular.module('navigationbar', [])
        // nombre de la directiva, con el q se hace referencia en el html
        .component('navuser', {
            templateUrl: '/MiRuta_2017/public/appUser/navigationbar/navigationbarView.html',
            controller: 'NavController'
        })
        // nombre de la directiva, con el q se hace referencia en el html
        .component('navadmin', {
            templateUrl: '/MiRuta_2017/public/appUser/navigationbar/navAdminView.html'
        })
})()
