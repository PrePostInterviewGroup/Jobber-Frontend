
;(function () {
  'use strict';

  angular.module('jobs')

    .factory('CompaniesFactory', function ($http, $rootScope, $location, JOBBER, PATHS, UsersFactory) {

      var broadcast = function(action, obj) {
        $rootScope.$broadcast('companies:' + action, obj);
      };

      return {

        create: function (obj) {
          console.log('obj: ', obj);
          console.log('config(): ', UsersFactory.config());
          $http.post(JOBBER.URL + 'company', obj, UsersFactory.config())
            .success(function (res) {

              console.log('res: ', res);

              obj.id = res.id;

              console.log('obj: ', obj);

              broadcast('created', obj);
            });
        },

        retrieveAll: function () {

          // TODO:
          // Need to return falsey if no data (Dashboard page
          // will not be default home page in this case).

          return $http.get(JOBBER.URL + 'company', UsersFactory.config());
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

