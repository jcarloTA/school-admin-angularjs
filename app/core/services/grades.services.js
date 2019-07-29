

angular.module('adminApp.gradesServices', [])

.factory('gradesService', ['$http', '$q', 'Config', function($http, $q, Config) {

    function getGrades() {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/grades')
            .then(function(res) {
                console.log('res', res)
                resolve(res.data.grades);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function createGrade(body) {
        return $q(function(resolve, reject) {
            $http.post(Config.apiUrl + '/grades', body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                reject(err);
            })
        })
    }

    function getGradeById(id) {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/grades/'+id)
            .then(function(res) {
                resolve(res.data.grade);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function updateGrade(body, id) {
        return $q(function(resolve, reject) {
            $http.put(Config.apiUrl + '/grades/' + id, body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function deleteGrade(id) {
        return $q(function(resolve, reject) {
            $http.delete(Config.apiUrl + '/grades/' + id)
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
        getGrades: getGrades,
        createGrade: createGrade,
        deleteGrade: deleteGrade,
        updateGrade: updateGrade,
        getGradeById: getGradeById
    }
    
}])