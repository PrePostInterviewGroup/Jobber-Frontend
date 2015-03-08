
;(function () {
  'use strict';

  angular.module('dashboard', [])

    .controller('Dashboard', function ($scope, $location, UsersFactory) {

      // Redirect if not signed in
      if (!UsersFactory.getCookie()) return $location.path('/signin');

    });

}());

