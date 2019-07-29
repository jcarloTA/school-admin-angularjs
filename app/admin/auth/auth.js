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

.controller('SignupCrl',['$scope','authService', '$location','$rootScope', function($scope, authService, $location, $rootScope) {
  $scope.errors = {
    show: false,
    message: 'Incorrect credentials'
  }
  $scope.formData = {
    username: '',
    email: '',
    password: ''
  }

  $scope.submitRegister = function() {
    console.log('loginForm', $scope.formData)
    authService.signup($scope.formData)
    .then(function(res){
      $location.path('/admin/auth/signin')
    })
    .catch(function(err) {
      if(err.status == 400) {
        $scope.errors = {
          show: true,
          message: 'User information does not meet the requirements. The password must be between 6 and 200 characters'
        }
      }
      console.log('err login', err)
    })
  }
  $scope.focusInputs = function() {
      $scope.errors.show = false
  }
}])
.controller('SigninCrl', ['$scope','authService', '$location','$rootScope', function($scope, authService, $location, $rootScope) {
    $scope.errors = {
      show: false,
      message: 'Incorrect credentials'
    }
    $scope.formData = {
      email: '',
      password: ''
    }

    $scope.submitLogin = function() {
      console.log('loginForm', $scope.formData)
      authService.signin($scope.formData)
      .then(function(res){
        authService.storeUserCredentials(res.data.token)
        $rootScope.isAuth = authService.getValueAuthenticated();
        $location.path('/admin')
      })
      .catch(function(err) {
        if(err.status == 400) {
          $scope.errors = {
            show: true,
            message: 'Incorrect credentials'
          }
        }
        console.log('err login', err)
      })
    }
    $scope.focusInput = function() {
        $scope.errors.show = false
    }
}])