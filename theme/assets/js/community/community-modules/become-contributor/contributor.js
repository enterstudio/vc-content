var storefrontApp = angular.module('storefrontApp');

storefrontApp.controller('contributorController', ['$scope', '$window', '$timeout', '$location', '$localStorage', 'communityService', 'customerService', function ($scope, $window, $timeout, $location, $localStorage, communityService, customerService) {

    function initialize() {

        customerService.getCurrentCustomer().then(function (customer) {
            if (customer.data.userName === "Anonymous") {
                document.location.href = "account/login";
            }

            $scope.user_name = customer.data.firstName;
            $scope.reloadContributorData();
        })
    }

    $scope.reloadContributorData = function () {
        communityService.getContributor($scope.user_name).then(function (contributor) {
            if (!_.isEmpty(contributor)) {
                $scope.contributor = contributor[$scope.step];
            }
            $scope.loaded = true;
        })
    }

    function updateStep () {
        if ($scope.step === 'licenseTerms')
            $scope.step = 'contactInfo';
        else if ($scope.step === 'contactInfo')
            $scope.step = 'projectInfo'
        else {
            $scope.formCompleted = true;
            $timeout(function () { document.location.href = "/vc-comunity" }, 1700)
        }
        $scope.reloadContributorData();
    }

    $scope.updateContributorInfo = function (data) {
        communityService.addContributorInformation(data, $scope.step, $scope.user_name).then(function (resp) {
            if (resp)
                $scope.contributor = {};
        })
        updateStep();
    }
    
    initialize();
}]);
