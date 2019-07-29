'use strict';

angular.module('adminApp.assigns', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/assigns', 
  {
    templateUrl: 'admin/assigns/assigns.read.delete.html',
    controller: 'ReadDeleteControllerAssigns'
  })
  .when('/admin/assigns/add', 
  {
    templateUrl: 'admin/assigns/assigns.add.html',
    controller: 'AddControllerGradeAssigns'
  })
  .when('/admin/assigns/edit/:id', 
  {
    templateUrl: 'admin/assigns/assigns.edit.html',
    controller: 'EditControllerAssigns'
  })
  
}])

.controller('ReadDeleteControllerAssigns', ['$scope','assignsServices', function($scope, assignsServices) {
    $scope.assignsLists = []
    $scope.deleteAssign = function(assign) {
      console.log("studnet de", assign.id)
      assignsServices.deleteAssign(assign.id)
      .then( function(res) {
        setAssigns();
      })
    }
    function setAssigns() {
        assignsServices.getAssigns()
        .then( function(assign) {
            console.log('assigns', assign)
            $scope.assignsLists = assign;
            console.log('assign',assign )
        })
    }

    setAssigns();
}])

.controller('AddControllerGradeAssigns', ['$scope', 'gradesService', 'studentsService','$location', 'assignsServices', 
function($scope, gradesService, studentsService, $location, assignsServices) {
  $scope.studentsLists = []    
  $scope.gradesLists = []    
  $scope.formData = {
      section: '',
      grade_id: '',
      student_id: ''
  }

  function setGrades() {
    gradesService.getGrades()
    .then(function(res) {
      $scope.gradesLists = res
    })
  }

  function setStudents() {
    studentsService.getStudents()
    .then(function(res) {
      $scope.studentsLists = res
    })
  }

  $scope.addSubmit = function() {
    console.log('data', $scope.formData)
    $scope.formData.student_id = parseInt($scope.formData.student_id)
    $scope.formData.grade_id = parseInt($scope.formData.grade_id)
    assignsServices.createAssigns($scope.formData)
      .then(function(res) {
        $location.path('/admin/assigns/')
      })
      .catch(function(err) {
        console.log('err', err)
      })
  }

  setGrades()
  setStudents()
}])

.controller('EditControllerAssigns', ['$scope','$location', '$routeParams', 'gradesService','assignsServices','studentsService',
function($scope, $location, $routeParams, gradesService, assignsServices, studentsService) {
  var assign_id = $routeParams.id
  $scope.studentsLists = []    
  $scope.gradesLists = []    
  $scope.formData = {
      section: '',
      grade_id: '',
      student_id: ''
  }

  assignsServices.getAssignById(assign_id)
    .then(function(res){
      console.log(res)
      $scope.formData.section = res.section
      $scope.formData.grade_id = res.grade_id
      $scope.formData.student_id = res.student_id
  })


  function setGrades() {
    gradesService.getGrades()
    .then(function(res) {
      $scope.gradesLists = res
    })
  }

  function setStudents() {
    studentsService.getStudents()
    .then(function(res) {
      $scope.studentsLists = res
    })
  }

  $scope.editSubmit = function() {
    console.log('data', $scope.formData)
    $scope.formData.student_id = parseInt($scope.formData.student_id)
    $scope.formData.grade_id = parseInt($scope.formData.grade_id)
    assignsServices.updateAssign($scope.formData, assign_id)
      .then(function(res) {
        $location.path('/admin/assigns/')
      })
      .catch(function(err) {
        console.log('err', err)
      })
  }

  setGrades()
  setStudents()

}])