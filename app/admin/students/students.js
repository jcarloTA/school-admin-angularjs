'use strict';

angular.module('adminApp.students', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/students', 
  {
    templateUrl: 'admin/students/students.read.delete.html',
    controller: 'ReadDeleteController'
  })
  .when('/admin/students/add', 
  {
    templateUrl: 'admin/students/students.add.html',
    controller: 'AddController'
  })
  .when('/admin/students/edit/:id', 
  {
    templateUrl: 'admin/students/students.edit.html',
    controller: 'EdditController'
  })
  
}])

.controller('ReadDeleteController', ['$scope', 'studentsService', function($scope, studentsService) {
    $scope.studentsLists = []
    $scope.deleteStudent = function(student) {
      console.log("studnet de", student.id)
      studentsService.deleteStudent(student.id)
      .then( function(res) {
        setStudents();
      })
    }
    function setStudents() {
      studentsService.getStudents()
      .then( function(students) {
        $scope.studentsLists = students;
        console.log('students',students )
      })
    }

    setStudents();
}])

.controller('AddController', ['$scope', 'studentsService', 'moment','$location', function($scope, studentsService, moment, $location) {
    $scope.dateBirthday = ''
    $scope.formData = {
      name:'',
      lastname:'',
      gender: '',
      birthdate: ''
    }
    $scope.addStudent = function() {
      $scope.formData.birthdate = moment($scope.dateBirthday).format('YYYY-MM-DD')
      console.log('data', $scope.formData)

      studentsService.createStudent($scope.formData)
        .then(function(res) {
          $location.path('/admin/students/')
        })
        .catch(function(err) {
          console.log("err", err)
        })
    }


}])

.controller('EdditController', ['$scope', 'studentsService', 'moment','$location', '$routeParams',function($scope, studentsService, moment, $location, $routeParams) {
  var student_id = $routeParams.id
  $scope.dateBirthday = ''
  $scope.formData = {
    name:'',
    lastname:'',
    gender: '',
    birthdate: ''
  }
  $scope.dateBirthday = ''
  studentsService.getStudentById(student_id)
  .then(function(res){
    console.log(res)
    console.log(moment(res.birthdate).format())
    $scope.formData.name = res.name
    $scope.formData.lastname = res.lastname
    $scope.formData.gender = res.gender
    $scope.formData.birthdate = res.birthdate
    $scope.dateBirthday = new Date(res.birthdate)
  })

  $scope.editSubmit = function() {
    $scope.formData.birthdate = moment($scope.dateBirthday).format('YYYY-MM-DD')
    console.log('data', $scope.formData)

    studentsService.updateStudent($scope.formData, student_id)
      .then(function(res) {
        $location.path('/admin/students/')
      })
      .catch(function(err) {
        console.log("err", err)
      })
  }
}])