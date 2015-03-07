
;(function () {
  'use strict';

  angular.module('users', ['ngCookies'])

  .controller('Users', function ($scope, $rootScope, $location, UsersFactory) {

    // var updateUserMenuState = function () {
    //   // $scope.user = UsersFactory.getCookie();
    //   // $scope.signedIn = ($scope.user) ? true : false;
    //   $scope.showUserMenu = false;

    //   var user = UsersFactory.getCookie();
    //   if (user) {
    //     $scope.signedIn = true;
    //     $scope.user = user;
    //   } else {
    //     $scope.signedIn = false;
    //   }
    // };

    // Redirect if signed in (and leave this controller).
    if (UsersFactory.getCookie()) return $location.path('/');

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


    // Listen for signup/signin error broadcast.
    $rootScope.$on('userAuth:signupError', function (event, r) {
      $scope.error = r;
    });

    $rootScope.$on('userAuth:signinError', function (event, r) {
      $scope.error = r;
    });

  })

  .controller('UserProfile', function ($scope, UsersFactory) {

    $scope.signOut = function() {
      UsersFactory.signout();
      // $scope.user = {};
    };

  });

}());

