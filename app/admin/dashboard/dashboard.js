'use strict';

angular.module('adminApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin', 
  {
    templateUrl: 'admin/dashboard/dashboard.html',
    controller: 'adminController'
  })
  
}])

.controller('adminController', ['$scope', function($scope) {
    $scope.mi = "Q pdo"
}])