'use strict';

angular.module('adminApp.teachers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/teachers', 
  {
    templateUrl: 'admin/teachers/teachers.read.delete.html',
    controller: 'ReadDeleteControllerTeachers'
  })
  .when('/admin/teachers/add', 
  {
    templateUrl: 'admin/teachers/teachers.add.html',
    controller: 'AddControllerTeachers'
  })
  .when('/admin/teachers/edit/:id', 
  {
    templateUrl: 'admin/teachers/teachers.edit.html',
    controller: 'EdditControllerTeachers'
  })
  
}])

.controller('ReadDeleteControllerTeachers', ['$scope', 'teachersService', function($scope, teachersService) {
    $scope.teachersLists = []
    $scope.deleteGrade = function(teacher) {
      console.log("studnet de", teacher.id)
      teachersService.deleteGrade(teacher.id)
      .then( function(res) {
        setTeachers();
      })
    }
    function setTeachers() {
        teachersService.getTeachers()
        .then( function(teachers) {
            $scope.teachersLists = teachers;
            console.log('teachers',teachers )
        })
    }

    setTeachers();
}])

.controller('AddControllerTeachers', ['$scope', 'teachersService', 'moment','$location', function($scope, teachersService, moment, $location) {
    $scope.formData = {
    	name: '',
      lastname: '',
      gender: ''
    }

    $scope.addSubmit = function() {
      console.log('data', $scope.formData)

      teachersService.createTeacher($scope.formData)
        .then(function(res) {
          $location.path('/admin/teachers/')
        })
        .catch(function(err) {
          console.log('err', err)
        })
    }


}])

.controller('EdditControllerTeachers', ['$scope', 'teachersService', 'moment','$location', '$routeParams',function($scope, teachersService, moment, $location, $routeParams) {
  var teacher_id = $routeParams.id
  $scope.formData = {
    name:'',
    lastname:'',
    gender: '',
  }
  $scope.dateBirthday = ''
  teachersService.getTeacherById(teacher_id)
  .then(function(res){
    console.log(res)
    $scope.formData.name = res.name
    $scope.formData.lastname = res.lastname
    $scope.formData.gender = res.gender
  })

  $scope.editSubmit = function() {
    console.log('data', $scope.formData)

    teachersService.updateTeacher($scope.formData, teacher_id)
      .then(function(res) {
        $location.path('/admin/teachers/')
      })
      .catch(function(err) {
        console.log("err", err)
      })
  }
}])