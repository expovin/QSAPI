'use strict';

angular.module('qsmig')

    .constant('CONFIG',{
            BASE_REST_URL :'http://localhost:3000/'
    })



    .controller('HeaderController', ['$scope', 'headerFactory','$state', '$location',
        function($scope,headerFactory,$state,$location) {

        $scope.isActive = function (viewLocation) { 
            return $location.path().includes(viewLocation);
		};


                        
    }])

    .controller('MainContentController', ['$scope', 'headerFactory','$state',
        function($scope,headerFactory,$state) {

        console.log("Sono in MainContentController");
                      
    }])


    .controller('SitesController', ['$scope', 'FileFactory','$state','QRSFactory',
        function($scope,FileFactory,$state,QRSFactory) {

            FileFactory.getSites().query(
                function(response) {                        
                    $scope.nodesDetails = {};
                    getDetails(response);
                    $scope.nodes = response;
                },
                function(response) {
                    console.log("Qui ERRORE!");
                }
            );

            function getDetails(serverName){
                serverName.forEach(function(s) {
                    console.log("getDetails for Server "+s);

                    QRSFactory.getType(s, '4242').query({'type':'about'},
                        function(response) {      
                            console.log(response);                
                            $scope.nodesDetails[s] = response;
                        },
                        function(response) {
                            console.log("Qui ERRORE!");
                        }
                    );
                })
            }
                
            $scope.gotoSiteDetails = function(s){
                console.log("Vado a dettaglio servr")
            }
                
                      
    }])   

    .controller('SitesDetailsController', ['$scope', 'QRSFactory','$state', '$stateParams',
        function($scope,QRSFactory,$state,$stateParams) {

            $scope.label = {
                'user' : {
                    'name' : 'userId',
                    'id' : 'id',
                    'User Directory' : 'userDirectory',
                    'Name' : 'name',
                    'Inactive' : 'inactive'
                },
                'task' : {
                    'name' : 'name',
                    'id' : 'id',
                    'app' : 'app.name'
                },
                'app' : {
                    'name' : 'name',
                    'id' : 'id',
                    'owner' : 'owner.name',
                    'description' : 'description',
                    'Size' : 'fileSize'
                }
            };

            $scope.types={};
            $scope.selectedType='user';
            $scope.QSTypeObjects = ['user','task','app','stream'];
            var server = $stateParams.server;
            console.log("Sono in SitesDetailsController richiamato per server "+server);

            $scope.setObjectType = function(type) {
                console.log("Imposto nuovo type "+type);
                $scope.selectedType=type;
            }

            $scope.QSTypeObjects.forEach( function(type){

                QRSFactory.getTypeFull(server,'4242').query({'type':type},
                    function(response) {                        
                        console.log(response);
                        $scope.types[type] = response;
                    },
                    function(response) {
                        console.log("Qui ERRORE!");
                        console.log(response);
                    }
                );
            })

                        
    }])

    .controller('SavedConfController', ['$scope', 'headerFactory','$state',
        function($scope,headerFactory,$state) {

        console.log("Sono in SavedConfController");
                      
    }])   