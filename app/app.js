'use strict';

// Declare app level module which depends on views, and core components
angular.module('adminApp', [
  'ngRoute',
  'angularMoment',
  'adminApp.students',
  'adminApp.auth',
  'adminApp.dashboard',
  'adminApp.teachers',
  'adminApp.grades',
  'adminApp.assigns',
  'adminApp.authServices',
  'adminApp.gradesServices',
  'adminApp.studentsServices',
  'adminApp.teachersServices',
  'adminApp.assignsServices',
])
.constant("Config", {
  apiUrl: "http://localhost:3000",
  name:'school-admin'
})
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/admin/students'});

}])
.controller('NavController', ['$scope','authService',function($scope, authServcie) {
  $scope.mi = "Q pdo";  
  $scope.isAuth = authServcie.getIsAuthenticated();
}])
.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      console.log("rejjectionk", rejection)
      if(rejection === 'AUTHENTICATED'){
          $location.path('/admin/welcome');
      } else if(rejection === 'NOT_AUTHENTICATED') {
          $location.path('/admin/auth/signin');
      }
  })
})
