

angular.module('adminApp.authServices', [])

.factory('authService', ['$http', '$q', 'Config', '$location', function($http, $q, Config, $location) {
    var LOCAL_TOKEN_KEY = Config.name + "-user";

    var id = "";
    var isAuthenticated = false;
    
    function validToken() {
        var token = getToken();
        if (token) {
            var params = parseJwt(token);
            if (Math.round(new Date().getTime() / 1000) <= params.exp) {
                return true;
            } else {
                destroyUserCredentials();
                return false;
            }
        } else {
            return false;
        }
    }

    function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(atob(base64));
    }

    function getToken() {
        return window.localStorage.getItem(LOCAL_TOKEN_KEY);
    }

    var loadUserCredentials = function() {
        var token = getToken();
        if (token) {
            useCredentials(token);
        }
        setBearer();
    };

    function setBearer() {
        var token = getToken();
        if (token) {
            $http.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            $http.defaults.headers.common["Authorization"] = undefined;
        }
    }

    function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        loadUserCredentials();
    }

    function useCredentials(token) {
        var params = parseJwt(token);
        console.log('params', params)
        id = params.id;
        isAuthenticated = true;
    }

    function destroyUserCredentials() {
        id = "";
        isAuthenticated = false;
        $http.defaults.headers.common["Authorization"] = undefined;
        window.localStorage.clear();
    }


    function signup(body) {
        return $q(function(resolve, reject) {
            $http.post(Config.apiUrl + '/users', body)
            .then(function(res) {
                resolve(res)
            },function(err) {
                reject(err);
            })
        })
    };
    function signin(body) {
        return $q(function(resolve, reject) {
            $http.post(Config.apiUrl + '/users/login', body)
            .then(function(res) {
                console.log('res login', res)
                resolve(res)
            },function(err) {
                reject(err);
            })
        })
    };

    function getIsAuthenticated() {
        validToken()
        return $q(function(resolve, reject){ 
            if(isAuthenticated)
                resolve(isAuthenticated)
            reject("NOT_AUTHENTICATED")
        })
    }

    function getIsNotAuthenticated() {
        validToken()
        return $q(function(resolve, reject){ 
            if(isAuthenticated)
                reject("AUTHENTICATED")
            resolve(isAuthenticated)
        })
    }

    function logout() {
        destroyUserCredentials();
        $location.path('/admin/auth/signin');
    };

    loadUserCredentials();
    return {
        getValueAuthenticated: function() {
            return isAuthenticated
        },
        getIsAuthenticated: getIsAuthenticated,
        getIsNotAuthenticated: getIsNotAuthenticated,
        signup: signup,
        signin: signin,
        logout: logout,
        storeUserCredentials: storeUserCredentials
    }
    
}])