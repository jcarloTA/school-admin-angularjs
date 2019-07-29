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

  $routeProvider.otherwise({redirectTo: '/admin'});

}])
.controller('NavController', ['$scope','authService', '$rootScope', function($scope, authService, $rootScope) {
  $rootScope.isAuth = authService.getValueAuthenticated();
  console.log('isAuth', $scope.isAuth)
  $scope.logout = function() {
    authService.logout();
    $rootScope.isAuth = authService.getValueAuthenticated();
    console.log('logout1',$rootScope.isAuth)
  }
}])
.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      console.log("rejjectionk", rejection)
      if(rejection === 'AUTHENTICATED'){
          $location.path('/admin');
      } else if(rejection === 'NOT_AUTHENTICATED') {
          $location.path('/admin/auth/signin');
      }
  })
})
