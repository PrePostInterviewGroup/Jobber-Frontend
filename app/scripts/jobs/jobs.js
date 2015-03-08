
;(function () {
  'use strict';

  angular.module('jobber.jobs', [])

  .controller('Jobs', function ($scope, $location, UsersFactory, CompaniesFactory, JobsFactory, EventsFactory) {

    console.log('Jobs controller initialized!');

    // Redirect if not signed in
    if (!UsersFactory.getCookie()) return $location.path('/signin');

    $scope.events = [];
    $scope.event = {id: 'Yo', name: 'name'};

    $scope.companies = CompaniesFactory.retrieveAll()
      .success(function (res) {

        // var fakeCompanies = [
        //   {company_id: 1, name: 'Sears', jobs: [
        //     {job_id: 44, title: 'Program Director'},
        //     {job_id: 63, title: 'Software Engineer'}
        //   ]},
        //   {company_id: 2, name: 'BoA', jobs: [
        //     {job_id: 4, title: 'Junior Developer'},
        //     {job_id: 9, title: 'Manager'}
        //   ]},
        //   {company_id: 3, name: 'CareerBuilder', jobs: [
        //     {job_id: 1, title: 'Project Manager', summary: 'Lead a new project', lead: 'John Doe'},
        //     {job_id: 2, title: 'Junior Developer', summary: 'Great job (do our grunt work)', lead: 'Pinnochio'}
        //   ]}
        // ];

        // $scope.companies = res.companies || fakeCompanies;
        // console.log(res[0].name);
        $scope.companies = res;
        console.log($scope.companies);
      });

    $scope.showJobs = function (company) {
      // console.log('company: ', company.jobs);
      $scope.jobs = company.jobs;
      // console.log(company.jobs);
    };

    $scope.showJobDetails = function (job) {
      console.log('job: ', job);
      $scope.job = job;
    };

    $scope.openCompanyModal = function (company) {
      if (!company) $scope.isNewCompany = true;
      $('#addCompany').openModal();
    };

    $scope.submitCompany = function (company) {

      console.log(company);

      if ($scope.isNewCompany) {
        CompaniesFactory.create(company);
      } else {
        CompaniesFactory.update(company);
      }
    };

    $scope.openJobModal = function (job) {
      if (!job) $scope.isNewJob = true;
      $('#addJob').openModal();
    };

    $scope.submitJob = function (job) {

      console.log(job);

      if ($scope.isNewJob) {
        JobsFactory.create(job);
      } else {
        JobsFactory.update(job);
      }
    };

    $scope.openEventModal = function (event) {
      if (!event) $scope.isNewEvent = true;
      $('#addEvent').openModal();
    };

    $scope.submitEvent = function (event) {

      console.log('event: ', event);

      $scope.event.date = $('#datePicker').val();
      $scope.events.push($scope.event);

      if ($scope.isNewEvent) {
        // EventsFactory.create(event).success(function (res) {
        //   console.log(res);
        // });
      } else {
      //   EventsFactory.update(event);
      }
    };

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

  });

}());

