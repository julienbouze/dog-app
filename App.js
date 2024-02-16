(() => {
  "use strict";

  const App = angular.module("App", [
    "App.controllers",
    "App.services",
    "App.directives",
    "App.filters",
    "ngRoute",
    "ngResource",
  ]);

  App.config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "view/form.html",
      })
      .otherwise({ redirectTo: "" });
  });

})();
