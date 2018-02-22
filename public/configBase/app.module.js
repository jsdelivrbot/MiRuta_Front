// modulo principal con sus respectivas dependencias
(function () {
    'use strict';
    angular.module('miRutaApp', [
        // Externos
        'ngSanitize',
        'ngRoute',
        'openlayers-directive',
        // 'ui.bootstrap',

        // Propios
        'navigationbar',
        'pagefooter',
        'routes',
        'mapModule',
        'adminModule',
        'servicesRestModule',
        'angular-storage'
    ]).run(['$rootScope',
        function ($rootScope) {
            $rootScope.title = "MiRuta";
        }
    ])
    // agregado para controlar el acceso a las pantallas del administrador
    // .factory('authInterceptor', [
    //     '$rootScope',
    //     '$q',
    //     '$window',
    //     '$location',
    //     'store',
    //     function ($rootScope, $q, $window, $location, store) {
    //         return {
    //             request: function (config) {
    //                 //console.log("se ejecuto request, authInterceptor");
    //                 config.headers = config.headers || {};
    //                 // if ($window.sessionStorage.api_token) {
    //                 if (store.get('jwt')) {
    //                     //console.log("token que voy a agregar a la request: ", $window.sessionStorage.api_token);
    //                     config.headers['Authorization'] = 'Bearer ' + store.get('jwt');
    //                 }
    //                 return config;
    //             },
    //             responseError: function (response) {
    //                 //console.log("authInterceptor vino error: ", response);
    //                 if (response.status == 401) {
    //                     //$rootScope.status = 401;
    //                     //$location.path('/login');
    //                     //return;
    //                 }
    //                 return $q.reject(response);
    //             }
    //         };
    //     }
    // ])
    // .config(function ($httpProvider) {
    //     $httpProvider.interceptors.push('authInterceptor');
    // })
})()