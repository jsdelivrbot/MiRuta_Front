// Responsabilidad : Permitir ver la ponderacion de los recorridos
// TODO sin funcionalidad debido a que no se creo el servicio en el backend
(function () {
    'use strict';
    // Se llama al modulo "mapModule"(), seria una especie de get
    // angular.module('mapModule', ['drawModule'])
    angular.module('mapModule')
        .controller('adminRecorridoController', [
            '$scope',
            'creatorMap',
            'dataServer',
            // 'drawController',
            'srvComponents',
            AdminRecorridoController
        ]);

    function AdminRecorridoController(vm, creatorMap, dataServer, drawing) {
    // function AdminRecorridoController(vm, creatorMap, dataServer) {

        // #############################################################################
        // ########################## VARIABLES PUBLICAS ###############################

        // generamos un mapa de entrada
        vm.map = creatorMap.getMap();

        vm.nombreUnidades = [];

        vm.recorridos = [];

        vm.indice = 0;

        vm.cantParadas = "";
        vm.callePunto = "";

        vm.nombreUnidadSeleccionada = "";
        vm.unidadTrsnspSelec = [];
        vm.transporteSeleccionado = false;

        // #############################################################################
        // #############################################################################


        // #############################################################################
        // ######################### VARIABLES PRIVADAS ################################

        // array con las coordenadas del recorrido
        var COORD_RECORRIDO = [];
        // array donde se almacenan los marcadores
        var vectorSource = new ol.source.Vector();
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        // #############################################################################
        // #############################################################################


        // #############################################################################
        // ######################### FUNCIONES PRIVADAS ################################

        function cargaNombreUnidades() {
            dataServer.getNombreUnidades()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.nombreUnidades = data;
                    console.log("Datos recuperados con EXITO! = UNIDADES");
                    console.log(vm.nombreUnidades);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las UNIDADES");
                })
        }

        function cargaRecorridos(){
            dataServer.getRecorridos()
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    vm.recorridos = data;
                    console.log("Datos recuperados con EXITO! = RECORRIDOS");
                    console.log(vm.recorridos);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al cargar las RECORRIDOS");
                })
        }

        function didujarPuntoCercano(coordMapa){
            drawing.getPointNearest(coordMapa)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    var coord = data;
                    console.log("Datos recuperados con EXITO! = PUNTO CERCANO");
                    var marcadorPtoCercano = drawing.getMarkerPoint(coord);
                    vectorSource.addFeature(marcadorPtoCercano);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al recuperar coord PUNTO CERCANO");
                })
        }

        function recuperarDireccion(coordMapa){
            drawing.getAddressPoint(coordMapa)
                 .then(function (data) {
                     // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                     vm.callePunto = data[0];
                     console.log("Datos recuperados con EXITO! = DIRECCION");
                     console.log(vm.callePunto);
                 })
                 .catch(function (err) {
                     console.log("ERRRROOORR!!!!!!!!!! ---> Al recuperar DIRECCION");
                     console.log(err);
                 })
        }

        function dibujarRutaPtos(puntos) {

            drawing.getRoute(puntos)
                .then(function (data) {
                    // una vez obtenida la respuesta del servidor realizamos las sigientes acciones
                    var coordGeomRuta = data.coordinates;
                    console.log("Datos recuperados con EXITO! = RUTA_PTOS");
                    var ruta = drawing.getFeatureRoute(coordGeomRuta);
                    vectorSource.addFeature(ruta);
                    // console.log("Datos recup del server - distancia: "+data);
                })
                .catch(function (err) {
                    console.log("ERRRROOORR!!!!!!!!!! ---> Al recuperar RUTA_PTOS");
                    console.log(err);
                })
        }

        // #############################################################################
        
        // #############################################################################
        // ################################ EVENTOS #####################################

        vm.map.on('click', function (evt) {
            console.log(evt.coordinate);
            // // agregamos el marcador al mapa
            COORD_RECORRIDO.push(evt.coordinate);
            vm.cantParadas = COORD_RECORRIDO.length;
            var cantPuntos = COORD_RECORRIDO.length;

            console.log("Cantidad de puntos: "+cantPuntos);
            if (cantPuntos > 1){
                var puntos = {
                    coordIni: COORD_RECORRIDO[cantPuntos - 2],
                    coordFin: evt.coordinate
                };
                dibujarRutaPtos(puntos);  
            }

            // buscamos el punto mas cercano que sea calle
            didujarPuntoCercano(evt.coordinate);

            // mostrar la direccion
            recuperarDireccion(evt.coordinate);

            vm.$apply();
        });

        vm.unidadTranspChanged = function(){
            if (!vm.transporteSeleccionado){
                vm.transporteSeleccionado = true;
            }
        }

        // #############################################################################
        // #############################################################################

        // ************************ Inicializacion de datos *****************************
        // al crear el controlador ejecutamos esta funcion
        cargaNombreUnidades();
        cargaRecorridos();
        // agregamos una capa de dibujo al mapa
        vm.map.addLayer(vectorLayer);

    } // fin Constructor

})()