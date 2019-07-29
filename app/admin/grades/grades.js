'use strict';

angular.module('adminApp.grades', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/grades', 
  {
    templateUrl: 'admin/grades/grades.read.delete.html',
    controller: 'ReadDeleteControllerGrades',
    resolve: { 
      'auth': function(authService) {
          return authService.getIsAuthenticated()
      }
    }
  })
  .when('/admin/grades/add', 
  {
    templateUrl: 'admin/grades/grades.add.html',
    controller: 'AddControllerGrades',
    resolve: { 
      'auth': function(authService) {
          return authService.getIsAuthenticated()
      }
    }
  })
  .when('/admin/grades/edit/:id', 
  {
    templateUrl: 'admin/grades/grades.edit.html',
    controller: 'EditControllerGrades',
    resolve: { 
      'auth': function(authService) {
          return authService.getIsAuthenticated()
      }
    }
  })
  
}])

.controller('ReadDeleteControllerGrades', ['$scope', 'gradesService', function($scope, gradesService) {
    $scope.gradesLists = []
    $scope.deleteGrade = function(grade) {
      console.log("studnet de", grade.id)
      gradesService.deleteGrade(grade.id)
      .then( function(res) {
        setGrades();
      })
    }
    function setGrades() {
        gradesService.getGrades()
        .then( function(grades) {
            $scope.gradesLists = grades;
            console.log('grades',grades )
        })
    }

    setGrades();
}])

.controller('AddControllerGrades', ['$scope', 'gradesService', 'teachersService', 'moment','$location', 
function($scope, gradesService, teachersService, moment, $location) {
  $scope.teachersLists = []    
  $scope.formData = {
    	name: '',
      teacher_id: ''
    }

    function setTeachers() {
      teachersService.getTeachers()
      .then(function(res) {
        $scope.teachersLists = res
      })
    }

    $scope.addSubmit = function() {
      console.log('data', $scope.formData)
      $scope.formData.teacher_id = parseInt($scope.formData.teacher_id)
      gradesService.createGrade($scope.formData)
        .then(function(res) {
          $location.path('/admin/grades/')
        })
        .catch(function(err) {
          console.log('err', err)
        })
    }

    setTeachers()
}])

.controller('EditControllerGrades', ['$scope', 'teachersService', 'moment','$location', '$routeParams', 'gradesService',
function($scope, teachersService, moment, $location, $routeParams, gradesService) {
  var teacher_id = $routeParams.id
  $scope.teachersLists = []    
  $scope.formData = {
    name: '',
    teacher_id: ''
  }
  $scope.dateBirthday = ''
  
  gradesService.getGradeById(teacher_id)
  .then(function(res){
    console.log(res)
    $scope.formData.name = res.name
    $scope.formData.teacher_id = res.teacher_id
  })

  function setTeachers() {
    teachersService.getTeachers()
    .then(function(res) {
      $scope.teachersLists = res
    })
  }
  $scope.editSubmit = function() {
    console.log('data', $scope.formData)
    $scope.formData.teacher_id = parseInt($scope.formData.teacher_id)
    gradesService.updateGrade($scope.formData, teacher_id)
      .then(function(res) {
        $location.path('/admin/grades/')
      })
      .catch(function(err) {
        console.log("err", err)
      })
  }
  setTeachers()

}])