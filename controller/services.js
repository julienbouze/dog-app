(() => {
  "use strict";
  const App = angular.module("App.services", []);

  App.value("version", "0.1");

  App.service('DataService', function ($http) {
    var sharedData = {};

    this.loadDataFromJsonFile = function (jsonFile) {
        return $http.get(jsonFile)
            .then(function (response) {
                sharedData = response.data;
                return sharedData;
            })
            .catch(function (error) {
                console.error('Erreur lors du chargement des données : ', error);
                return null;
            });
    };
    this.getSharedData = function () {
        return sharedData;
    };
  });
})();
