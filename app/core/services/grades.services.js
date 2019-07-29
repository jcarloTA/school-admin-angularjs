

angular.module('adminApp.gradesServices', [])

.factory('gradesService', ['$http', '$q', function($http, $q) {

    function test() {
        console.log('test1 11')
    }

    return {
        test: test
    }
    
}])