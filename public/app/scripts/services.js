'use strict';

angular.module('qsmig')

    .service('headerFactory', ['$resource', 'CONFIG', function($resource, CONFIG) {          
        var menufac = {};
/*
        menufac.getUsers = function(){
            return $resource(CONFIG.BASE_REST_URL+"user",null,  {'update':{method:'PUT' }});
        };
*/
        return menufac;                    
    }])

    .service('QRSFactory', ['$resource', 'CONFIG', function($resource, CONFIG) {          
        var qrsFac = {};

        qrsFac.getType = function(server, port){
            return $resource(CONFIG.BASE_REST_URL+"qrs/:type",{},  {

                                                                        'query': { 
                                                                            method:'GET',
                                                                            //isArray:true,
                                                                            headers : {
                                                                                'server_name' : server,
                                                                                'port' : port
                                                                            } 
                                                                        },

                                                                        'update': { 
                                                                            method:'PUT',
                                                                            headers : {
                                                                                'server_name' : server,
                                                                                'port' : port
                                                                            } 
                                                                        }
                                                                    });
        };

        qrsFac.getTypeFull = function(server, port){
            console.log("Arrivato in factory QRSFactory con server "+server+" and port "+port);
            return $resource(CONFIG.BASE_REST_URL+"qrs/:type/full",{},  {

                                                                        'query': { 
                                                                            method:'GET',
                                                                            isArray:true,
                                                                            headers : {
                                                                                'server_name' : server,
                                                                                'port' : port
                                                                            } 
                                                                        },

                                                                        'update': { 
                                                                            method:'PUT',
                                                                            headers : {
                                                                                'server_name' : server,
                                                                                'port' : port
                                                                            } 
                                                                        }
                                                                    });
        };

        return qrsFac;                    
    }])


    .service('FileFactory', ['$resource', 'CONFIG', function($resource, CONFIG) {          
        var fileFac = {};

        fileFac.getSites = function(){
            return $resource(CONFIG.BASE_REST_URL+"file/QSSite",null,  {'update':{method:'PUT' }});
        };

        return fileFac;                    
    }])
;