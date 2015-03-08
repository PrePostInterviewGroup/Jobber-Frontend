
;(function () {
  'use strict';

  angular.module('jobber.events')

  .factory('EventsFactory', function ($http, $rootScope, $location, JOBBER, PATHS, UsersFactory) {

    var broadcast = function(action, obj) {
      $rootScope.$broadcast('events:' + action, obj);
    };

    return {

      create: function (obj) {
        console.log('obj: ', obj);
        console.log('config(): ', UsersFactory.config());
        $http.post(JOBBER.URL + 'event', obj, UsersFactory.config())
          .success(function (res) {

            console.log('res: ', res);

            obj.id = res.id;

            console.log('obj: ', obj);

            broadcast('created', obj);
          });
      },

      update: function(obj) {
        $http.put(JOBBER.URL, obj, UsersFactory.config())
          .success(function () { broadcast('updated'); });
      },

      delete: function(obj) {
        $http.delete(JOBBER.URL, UsersFactory.config())
          .success(function () { broadcast('deleted', obj); });
      }

    };

  });

}());

