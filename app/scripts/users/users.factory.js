
;(function () {
  'use strict';

  angular.module('users')

    .factory('UsersFactory', function ($http, $rootScope, $cookieStore, $location, JOBBER, PATHS) {

      var self = this;

      var cookie = function () {
        return $cookieStore.get('jobsUser');
      };

      var config = function () {
        var token = cookie().user.authentication_token;
        // console.log('token: ', token);
        return {headers: {authentication_token: token}};
        // return {headers: {authentication_token: 'abcdefghijklmnopqrst'}};
        // return {headers: {authentication_token: 'sZHgJcxsM7Hp9Rx9KU33'}};
      };

      var broadcast = function(action, obj) {
        $rootScope.$broadcast('user:' + action, obj);
      };

      var addFakeData = function (userObj) {

        userObj.user.resumes = [
          {
            resume_id: 2,
            name: 'My_resume_feb_2015',
            url: 'https://www.aws.amazon.com/8sdfssdf7j8sdf.pdf'
          },
          {
            resume_id: 3,
            name: 'My_resume_mar_2015',
            url: 'https://www.aws.amazon.com/asdkljh3rwjhsd.pdf'
          }
        ];

        userObj.user.addr1 = '123 Main St.';
        userObj.user.city = 'Atlanta';
        userObj.user.state = 'GA';

        console.log('Updated userObj: ', userObj);

        return userObj;
      };

      return {

        setCookie: function (val) {
          $cookieStore.put('jobsUser', val);
        },

        getCookie: function () {
          return cookie();
          // return $cookieStore.get('jobsUser');
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

              res = addFakeData(res);


              self.setCookie(res);
              $location.path(PATHS.HOME);
              broadcast('signin', res);
            })
            .error(function (res) {
              // console.log(res);
              broadcast('signinError', res.messages[0]);
            });
        },

        signout: function () {
          $cookieStore.remove('jobsUser');
          $location.path('/signin');
        },

        update: function (userObj) {
          $http.post(JOBBER.URL + 'user_profile', {user: userObj}, config())
            .success(function (res) {
              console.log('success response: ', res);
              broadcast('update');
            })
            .error(function (res) {
              console.log('error response: ', res);
              broadcast('updateError', res.messages[0]);
            });
        }

      };

    });

}());

