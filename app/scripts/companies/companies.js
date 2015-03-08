
;(function () {
  'use strict';

  angular.module('companies', [])

    .controller('Companies', function ($scope, CompaniesFactory) {

      $scope.openCompanyModal = function (company) {
        if (!company) $scope.isNewCompany = true;
        $('#addCompany').openModal();
      };

      $scope.submitCompany = function (company) {

        console.log(company);

        // if ($scope.isNewCompany) {
        //   CompaniesFactory.create(company);
        // } else {
        //   CompaniesFactory.update(company);
        // }
      };

      $scope.openJobModal = function (job) {
        if (!job) $scope.isNewJob = true;
        $('#addJob').openModal();
      };

      $scope.submitJob = function (job) {

        console.log(job);

        // if ($scope.isNewJob) {
        //   JobsFactory.create(job);
        // } else {
        //   JobsFactory.update(job);
        // }
      };

    });

}());

