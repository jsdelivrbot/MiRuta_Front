// Constantes utilizadas por el modulo mapModule
// Responsabilidad : Solo guardar las Constantes del Sistema
(function() {
    'use strict';
    angular.module('mapModule')
    // .constant('path',{
    //     CENTRALITY: 'api/centrality',
    //     TRIP:'api/trip',
    //     TRIPS_RANKING: 'api/rankinged',
    //     JOURNEY: 'api/journey',
    //     ZONE: 'api/zone',
    //     DASHBOARD: 'api/dashboard',
    //     ROAD: 'api/road',
    //     TYPES_CENTRALITY: 'api/centralityTypes',
    //     ICON_CENTRALITY: 'js/CicloviasApp/components/icons'
    // })
    .constant('propiertiesMap',{
        PROJECTION: 'EPSG:4326',
        LONG_CENTER: '-65.0339126586914',
        LAT_CENTER: '-42.77000141404137',
        ZOOM: 13
    });
})()