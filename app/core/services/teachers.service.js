

angular.module('adminApp.teachersServices', [])

.factory('teachersService', ['$http', '$q', 'Config', function($http, $q, Config) {

    function getTeachers() {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/teachers')
            .then(function(res) {
                resolve(res.data.teachers);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function createTeacher(body) {
        return $q(function(resolve, reject) {
            $http.post(Config.apiUrl + '/teachers', body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                reject(err);
            })
        })
    }

    function getTeacherById(id) {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/teachers/'+id)
            .then(function(res) {
                resolve(res.data.teacher);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function updateTeacher(body, id) {
        return $q(function(resolve, reject) {
            $http.put(Config.apiUrl + '/teachers/' + id, body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function deleteTeacher(id) {
        return $q(function(resolve, reject) {
            $http.delete(Config.apiUrl + '/teachers/' + id)
            .then(function(res) {
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    return {
        getTeachers: getTeachers,
        createTeacher: createTeacher,
        deleteTeacher: deleteTeacher,
        updateTeacher: updateTeacher,
        getTeacherById: getTeacherById
    }
    
}])