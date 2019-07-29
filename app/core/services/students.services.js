

angular.module('adminApp.studentsServices', [])

.factory('studentsService', ['$http', '$q', 'Config', function($http, $q, Config) {

    function getStudents() {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/students')
            .then(function(res) {
                console.log('res', res)
                resolve(res.data.students);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function createStudent(body) {
        return $q(function(resolve, reject) {
            $http.post(Config.apiUrl + '/students', body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                reject(err);
            })
        })
    }

    function getStudentById(id) {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/students/'+id)
            .then(function(res) {
                resolve(res.data.student);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function updateStudent(body, id) {
        return $q(function(resolve, reject) {
            $http.put(Config.apiUrl + '/students/' + id, body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function deleteStudent(id) {
        console.log(Config.apiUrl + '/students/' + id)
        return $q(function(resolve, reject) {
            $http.delete(Config.apiUrl + '/students/' + id)
            .then(function(res) {
                console.log('res', res)
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    return {
        getStudents: getStudents,
        createStudent: createStudent,
        deleteStudent: deleteStudent,
        updateStudent: updateStudent,
        getStudentById: getStudentById
    }
    
}])