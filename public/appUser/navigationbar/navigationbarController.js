(function () {
    'use strict';

    angular.module('navigationbar')
        .controller('NavController', ['$scope', NavController]);
        // .controller('NavController', ['$scope', 'creatorMap', NavController]);

    // function NavController(vm, creatorMap) {
    function NavController(vm) {

        vm.desactive = function () {
            if (document.getElementById("row-offcanvas") != null) {
                document.getElementById("row-offcanvas").classList.remove("active");
            }
            // Se limpia el mapa al cambiar de vista.
            // creatorMap.clearMap();
        }

        vm.active = function () {
            if (document.getElementById("row-offcanvas") != null) {
                document.getElementById("row-offcanvas").classList.toggle("active");
            }
        }

    } // fin Constructor
})()
