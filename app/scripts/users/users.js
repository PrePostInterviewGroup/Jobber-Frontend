
;(function () {
  'use strict';

  angular.module('users', ['ngCookies'])

  .controller('Users', function ($scope, $rootScope, $location, UsersFactory) {

    // Redirect if signed in (and leave this controller).
    if (UsersFactory.getCookie()) return $location.path('/dashboard');

    $scope.signup = function (user) {
      if (user.password === user.password_confirmation) {
        UsersFactory.signup(user);
      } else {
        $scope.error = 'Passwords don\'t match.  Please try again.';
        $scope.user.password = '';
        $scope.user.password_confirmation = '';
        $('#password').focus();
      }
    };

    $scope.signIn = function (user) {
      UsersFactory.signin(user);
    };


    // Listen for signup/signin broadcasts.

    $rootScope.$on('user:signin', function (event, data) {
      $scope.user = data.user;
      console.log('$scope.user: ', $scope.user);
    });

    $rootScope.$on('user:signupError', function (event, data) {
      $scope.error = data;
    });

    $rootScope.$on('user:signinError', function (event, data) {
      $scope.error = data;
    });

  })

  .controller('UserProfile', function ($scope, $rootScope, $location, UsersFactory) {

    // Redirect if signed in (and leave this controller).
    if (!UsersFactory.getCookie()) return $location.path('/signin');

    $scope.signOut = function() {
      UsersFactory.signout();
      // $scope.user = {};
    };

    $scope.addAddress = function (user) {
      console.log(user);
      UsersFactory.update(user);
    };

    // Listen for update error broadcast.
    $rootScope.$on('user:updateError', function (event, data) {
      $scope.error = data;
    });

  });

}());

