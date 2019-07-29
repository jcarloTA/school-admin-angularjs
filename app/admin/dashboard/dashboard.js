'use strict';

angular.module('adminApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin', 
  {
    templateUrl: 'admin/auth/signup.html',
    controller: 'SignupCrl',
    resolve: { 
      'auth': function(authService) {
          return authService.isAuthenticated()
      }
    }
  })
  
}])

.controller('SignupCrl', ['$scope', function($scope) {
    $scope.mi = "Q pdo"
}])
.controller('SigninCrl', ['$scope', function($scope) {
    $scope.mi = "Q pdo"
}])