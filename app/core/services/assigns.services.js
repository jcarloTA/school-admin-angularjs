

angular.module('adminApp.assignsServices', [])

.factory('assignsServices', ['$http', '$q', function($http, $q) {

    function test() {
        console.log('test1 11')
    }

    return {
        test: test
    }
    
}])