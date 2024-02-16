(() => {
  "use strict";
  const App = angular.module("App.controllers", []);

  App.controller("form", function ($scope, $http, DataService) {
    $scope.food = [];
    $scope.selectedTypeRepas = "";
    $scope.filteredFood = [];
    $scope.selectedFood = null;
    $scope.selectedUnit = null;

    const unitsByType = {
      croquettes: [{ value: "g", label: "g" }],
      patee: [{ value: "g", label: "g" }],
      friandise: [{ value: "g", label: "g" }],
      complement: [{ value: "g", label: "g" }],
      eau: [{ value: "ml", label: "ml" }],
      medicament: [{ value: "g", label: "g" }, { value: "ml", label: "ml" }],
    };

    DataService.loadDataFromJsonFile('data/properties.json')
      .then(function (data) {
        $scope.food = data.food;
      })
      .catch(function (error) {
        console.error('Erreur lors du chargement des données : ', error);
      });

    $scope.updateFilteredFood = function (typeAliment) {
      $scope.selectedTypeRepas = typeAliment;
      $scope.filteredFood.length = 0;
      Array.prototype.push.apply($scope.filteredFood, $scope.food.filter(function (item) {
        return item.typeRepas === $scope.selectedTypeRepas;
      }));

      $scope.selectedFood = null;
      $scope.selectedUnit = null;
    };

    $scope.getUnitsForType = function () {
      return unitsByType[$scope.selectedTypeRepas] || [];
    };

    $scope.submitForm = function () {
      var typeRepas = $scope.selectedTypeRepas;
      var aliment = $scope.selectedFood.name;
      var quantite = $scope.quantite;
      var unite = $scope.selectedUnit;
      var dateheure = $scope.dateheure;
    
      var formData = {
        typeRepas: typeRepas,
        aliment: aliment,
        quantite: quantite,
        unite: unite,
        dateheure: dateheure
      };
    
      $http({
        method: 'POST',
        url: '/saveFormData.php', // Remplacez ceci par l'URL correcte de votre serveur
        data: formData
      }).then(function successCallback(response) {
        console.log('Données enregistrées avec succès:', response.data);
        window.location.reload();
      }, function errorCallback(response) {
        console.error('Erreur lors de l\'enregistrement des données:', response.status);
      });
    };
  });
})();
