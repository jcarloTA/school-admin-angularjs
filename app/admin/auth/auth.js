'use strict';

angular.module('adminApp.auth', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/auth/signup', 
  {
    templateUrl: 'admin/auth/signup.html',
    controller: 'SignupCrl',
    resolve: { 
      'auth': function(authService) {
          return authService.getIsNotAuthenticated()
      }
    }
  })   
  .when('/admin/auth/signin', 
  {
    templateUrl: 'admin/auth/signin.html',
    controller: 'SigninCrl',
    resolve: { 
      'auth': function(authService) {
          return authService.getIsNotAuthenticated()
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