
;(function () {
  'use strict';

  angular.module('users', ['ngCookies'])

  .controller('Users', function ($scope, $rootScope, $location, UsersFactory) {

    var updateUserMenuState = function () {
      // $scope.user = UsersFactory.getCookie();
      // $scope.signedIn = ($scope.user) ? true : false;
      $scope.showUserMenu = false;

      var user = UsersFactory.getCookie();
      if (user) {
        $scope.signedIn = true;
        $scope.user = user;
      } else {
        $scope.signedIn = false;
      }
    };

    // Redirect if signed in (and leave this controller).
    if (UsersFactory.getCookie()) return $location.path('/');

    $scope.signup = function (user) {

      // console.log(user);

      if (user.password === user.cPassword) {
        UsersFactory.signup(user);
      } else {
        $scope.error = 'Passwords don\'t match.  Please try again.';
        $scope.user.password = '';
        $scope.user.cPassword = '';
        $('#password').focus();
      }
    };

    $scope.signIn = function (user) {
      UsersFactory.signin(user);
    };

    $scope.signOut = function() {
      UsersFactory.signout();
      $scope.user = {};
    };


    // Listen for signup/signin error broadcast.
    $rootScope.$on('userAuth:signupError', function (event, r) {

      console.log(r);

      if (r.slice(0, 8) === 'username' && r.slice(-13) === 'already taken') {
        $scope.error = r.slice(9);
        $scope.resetPassword = 'Reset password?';
      } else if (r === 'missing user password') {
        $scope.error = 'Password is required';
      } else {
        $scope.error = r;
      }

    });

  });

}());

