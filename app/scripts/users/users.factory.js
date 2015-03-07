
;(function () {
  'use strict';

  angular.module('users')

  .factory('UsersFactory', function ($http, $rootScope, $cookieStore, $location, JOBBER, PATHS) {

    var broadcast = function(action, obj) {
      $rootScope.$broadcast('userAuth:' + action, obj);
    };

    return {

      setCookie: function (val) {
        $cookieStore.put('jobsUser', val);
      },

      getCookie: function () {
        return $cookieStore.get('jobsUser');
      },

      // tokenizeHeader: function () {
      //   var c = this.getCookie();
      //   if (c) return PARSE.CONFIG.headers['X-PARSE-Session-Token'] = c.sessionToken;
      // },

      signup: function (userObj) {
        var self = this;
        $http.post(JOBBER.URL + 'users', {user: userObj})
          .success(function (res) {
            self.setCookie(res);
            $location.path(PATHS.HOME);
            broadcast('signup');
          })
          .error(function (res) {
            broadcast('signupError', res.messages[0]);
          });
      },

      signin: function (userObj) {
        var self = this;
        $http.post(JOBBER.URL + 'users/sign_in', {user: userObj})
          .success(function (res) {
            // console.log(res);
            self.setCookie(res);
            $location.path(PATHS.HOME);
            broadcast('signin');
          })
          .error(function (res) {
            // console.log(res);
            broadcast('signinError', res.messages[0]);
          });
      },

      // signin: function (userObj) {
      //   return $http({
      //     method: 'GET',
      //     url: JOBBER.URL + 'login',
      //     headers: PARSE.CONFIG.headers,
      //     params: userObj
      //   })
      //     .success(function (res) {
      //       console.log(res);
      //       $cookieStore.put('jobsUser', res);
      //       $location.path(PATHS.HOME);
      //       broadcast('signin');
      //     })
      //     .error(function (res) {
      //       broadcast('signinError', res.messages[0]);
      //     });
      // },

      signout: function () {
        $cookieStore.remove('jobsUser');
        $location.path('/signin');
      }


    };

  });

}());

