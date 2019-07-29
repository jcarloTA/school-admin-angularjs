'use strict';

angular.module('adminApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin', 
  {
    templateUrl: 'admin/dashboard/dashboard.html',
    controller: 'adminController',
    resolve: { 
      'auth': function(authService) {
          return authService.getIsAuthenticated()
      }
    }
  })
  
}])

.controller('adminController', ['$scope', function($scope) {
    $scope.mi = "Q pdo"
}])