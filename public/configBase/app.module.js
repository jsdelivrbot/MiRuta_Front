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
        'mapModule'
    ]).run(['$rootScope',
        function ($rootScope) {
            $rootScope.title = "MiRuta";
        }
    ])
})()