
;(function () {
  'use strict';

  angular.module('jobber.users', ['ngCookies'])

  .controller('Users', function ($scope, $rootScope, $location, UsersFactory) {

    // Redirect if signed in (and leave this controller).
    if (UsersFactory.getCookie()) return $location.path('/settings');

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

    $scope.user = UsersFactory.getCookie().user;

    console.log('$scope.user: ', $scope.user);

    $scope.signOut = function() {
      UsersFactory.signout();
    };

    $scope.addAddress = function (user) {
      console.log(user);
      UsersFactory.update(user);
    };

    $scope.deleteResume = function (index) {
      console.log(index);

      var resumeId = $scope.user.resumes[index].resume_id;

      UsersFactory.deleteResume(resumeId);
    };

    // Listen for broadcast.
    $rootScope.$on('user:updateError', function (event, data) {
      $scope.error = data;
    });

  });

}());

