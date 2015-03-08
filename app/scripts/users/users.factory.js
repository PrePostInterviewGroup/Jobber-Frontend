
;(function () {
  'use strict';

  angular.module('jobber.users')

  .factory('UsersFactory', function ($http, $rootScope, $cookieStore, $location, JOBBER, AWS, PATHS) {

    var self = this;

    var cookie = function () {
      return $cookieStore.get('jobberUser');
    };

    var config = function () {
      var token = cookie().user.authentication_token;
      return {headers: {authentication_token: token}};
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
        $cookieStore.put('jobberUser', val);
      },

      getCookie: function () {
        return cookie();
        // return $cookieStore.get('jobberUser');
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
            // console.log('signin success res: ', res);

            res = addFakeData(res);

            self.setCookie(res);
            $location.path(PATHS.HOME);
          })
          .error(function (res) {
            // console.log('signin error res: ', res);
            broadcast('signinError', res.messages[0]);
          });
      },

      signout: function () {
        $cookieStore.remove('jobberUser');
        $location.path('/signin');
      },

      update: function (userObj) {
        $http.post(JOBBER.URL + 'user_profile', {user: userObj}, config())
          .success(function (res) {
            console.log('update success res: ', res);
            broadcast('update');
          })
          .error(function (res) {
            console.log('update error res: ', res);
            broadcast('updateError', res.messages[0]);
          });
      },

      deleteResume: function (id) {
        $http.delete(JOBBER.URL + 'user_resume/' + id, config());
      }

    };

  });

}());

