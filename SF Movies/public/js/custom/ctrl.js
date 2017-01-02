angular.module("sfmovieApp", ['uiGmapgoogle-maps','ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
        .controller("locationController", function($scope,$log,$http) {
                $scope.map = {
                        center: {
                                latitude: 37.791549,
                                longitude: -122.4113534
                        },
                        zoom: 8
                };
                $scope.marker=[{
                        id: 0,
                        coords: {
                                latitude: 37.791549,
                                longitude: -122.410794
                        },
                        options: { draggable: false,title:"San Fransisco" },
                }];
                $scope.createMarker = function(obj){
                    $scope.marker.push( {
                        id: obj.id,
                        coords: {
                                latitude: obj.coords.latitude,
                                longitude: obj.coords.longitude
                        },
                        options: { draggable: false, title:obj.name},
                } );
                }
                
    var self = this;
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;

        $http.get("/location").then(function(response){
              var allStates=response.data;
             self.states = allStates.map( function (state) {
                return {
                value: state.title.toLowerCase(),
                display: state.title
                };
            });
        });

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }
     function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states;
        return results;
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    
    function selectedItemChange(item) {
      if(item !== undefined){
          $http.get("/location/"+item.display).then(function(response){
              $scope.marker = $scope.marker.splice(0,1);
               for(var i=0;i<response.data[0].locations.length;i++){
                    $scope.createMarker(response.data[0].locations[i]);
                }
        });
      }   
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
});