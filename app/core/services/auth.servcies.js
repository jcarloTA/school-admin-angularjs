

angular.module('adminApp.authServices', [])

.factory('authService', ['$http', '$q', 'Config', function($http, $q, Config, $location) {
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


    function login(body) {
        return $q(function(resolve, reject) {
            var requestObject = {
                email: body.email,
                password: body.password
            };
            $http
                .post(Config.URL + "/v1/register", requestObject)
                .success(function(res) {
                    console.log("respuesta en login:1 ", res);
                    if (res.success) {
                        if (res.test) {
                            storeUserCredentials(res.token.token);
                            resolve(res);
                        } else {
                            if (
                                window.localStorage.getItem("testData") != null
                            ) {
                                storeUserCredentials(res.token.token);
                                resolve(res);
                            } else {
                                resolve(null);
                            }
                        }
                    } else {
                        reject(res.error);
                    }
                })
                .error(function(err) {
                    console.log("error de conexion ", err);
                    reject("Error de conexión");
                });
        });
    };

    function getIsAuthenticated() {
        validToken()
        return $q(function(resolve, reject){ 
            if(isAuthenticated)
                resolve(isAuthenticated)
            reject("AUTHENTICATED")
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

    loadUserCredentials();
    return {
        getIsAuthenticated: getIsAuthenticated,
        getIsNotAuthenticated: getIsNotAuthenticated
    }
    
}])