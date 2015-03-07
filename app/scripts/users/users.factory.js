
;(function () {
  'use strict';

  angular.module('users')

  .factory('UsersFactory', function ($http, $rootScope, $cookieStore, $location, HEROKU) {

    return {

      setCookie: function (val) {
        $cookieStore.put('jobsUser', val);
      },

      getCookie: function () {
        return $cookieStore.get('jobsUser');
      },

      tokenizeHeader: function () {
        var c = this.getCookie();
        if (c) return PARSE.CONFIG.headers['X-PARSE-Session-Token'] = c.sessionToken;
      },

      signup: function (userObj) {
        var self = this;
        delete userObj.cPassword;
        console.log(userObj);
        $http.post(HEROKU.URL + 'users', userObj)
          .success(function (res) {
            self.setCookie(res);
            // $location.path(PATHS.HOME);
            broadcast('signup');
          })
          .error(function (res) {
            broadcast('signupError', res.messages);
          });
      },

      signin: function (userObj) {
        return $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        })
          .success(function (res) {
            console.log(res);
            $cookieStore.put('jobsUser', res);
            $location.path(PATHS.HOME);
            broadcast('signin');
          });
      },

      signout: function () {
        $cookieStore.remove('jobsUser');
        $location.path('/login');
      }


    };

  });

}());

