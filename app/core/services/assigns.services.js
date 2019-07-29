

angular.module('adminApp.assignsServices', [])

.factory('assignsServices', ['$http', '$q', 'Config', function($http, $q, Config) {

    function getAssigns() {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/assigns')
            .then(function(res) {
                resolve(res.data.assigns);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function createAssigns(body) {
        return $q(function(resolve, reject) {
            $http.post(Config.apiUrl + '/assigns', body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                reject(err);
            })
        })
    }

    function getAssignById(id) {
        return $q(function(resolve, reject) {
            $http.get(Config.apiUrl + '/assigns/'+id)
            .then(function(res) {
                resolve(res.data.assign);
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function updateAssign(body, id) {
        return $q(function(resolve, reject) {
            $http.put(Config.apiUrl + '/assigns/' + id, body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    function deleteAssign(id) {
        return $q(function(resolve, reject) {
            $http.delete(Config.apiUrl + '/assigns/' + id)
            .then(function(res) {
                resolve(res)
            },function(err) {
                console.log('err', err)
                reject(err);
            })
        })
    }

    return {
        getAssigns: getAssigns,
        createAssigns: createAssigns,
        deleteAssign: deleteAssign,
        updateAssign: updateAssign,
        getAssignById: getAssignById
    }
    
}])