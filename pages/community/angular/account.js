var storefrontApp = angular.module('storefrontApp');

//storefrontApp
//    .component('vcCommunityMain', {
//        templateUrl: "vc-community.tpl",
//        $routeConfig: [
//            { path: '/', name: 'Lists', component: 'vcAccountLists' },
//            { path: '/friendsLists', name: 'FriendsLists', component: 'vcAccountFriendsLists' },
//            { path: '/myLists', name: 'MyLists', component: 'vcAccountMyLists', useAsDefault: true }
//        ],
//        controller: ['listService', '$rootScope', '$location', 'customerService', 'cartService', '$translate', 'loadingIndicatorService', '$timeout', 'dialogService', '$localStorage', function (listService, $rootScope, $location, customerService, cartService, $translate, loader, $timeout, dialogService, $localStorage) {
//            var $ctrl = this;
//            $ctrl.initialize = function () {
//                customerService.getCurrentCustomer().then(function (customer) {
//                    $ctrl.temp = angular.copy(customer.data)
//                    $ctrl.user = customer.data;
//                    $ctrl.newAddresses = {};
//                    if (!_.isEmpty($ctrl.user.addresses))
//                        if (!angular.isUndefined(_.first($ctrl.user.addresses).organization))
//                            angular.extend($ctrl.newAddresses, { organization: _.first($ctrl.user.addresses).organization });
//                })
//            }

//            $ctrl.updateAccount = function (changedData, newAddresses) {
//                var changedAddresses = communityService.getProfileParameters(newAddresses);
//                accountApi.updateAccount(changedData, mainContext.getCustomer).$promise;
//                accountApi.updateAddresses([changedAddresses], mainContext.getCustomer).$promise;
//                document.location.href = "account/login";
//            }


//            $ctrl.cancel = function () {
//               $ctrl.user = angular.copy($ctrl.temp);
//            }

//            mainContext.getCustomer = $ctrl.getCustomer = function () {
//                customerService.getCurrentCustomer().then(function (response) {
//                    var addressId = 1;
//                    _.each(response.data.addresses, function (address) {
//                        address.id = addressId;
//                        addressId++;
//                    });
//                    response.data.isContact = response.data.memberType === 'Contact';
//                    mainContext.customer = $ctrl.customer = response.data;
//                });
//            };
//            $ctrl.getCustomer();


//        }]
//    });

storefrontApp.controller('accountController', ['$scope', '$window', '$localStorage', '$location', 'communityService', 'customerService', 'accountApi', 'mainContext', function ($scope, $window, $localStorage, $location, communityService, customerService, accountApi, mainContext) {
    
    $scope.initialize = function () {
        customerService.getCurrentCustomer().then(function (customer) {
            $scope.temp = angular.copy(customer.data)
            $scope.user = customer.data;
            $scope.newAddresses = {};
            if (!_.isEmpty($scope.user.addresses))
                if (!angular.isUndefined(_.first($scope.user.addresses).organization))
                    angular.extend($scope.newAddresses, { organization: _.first($scope.user.addresses).organization });
        })
    }

    $scope.updateAccount = function (changedData, newAddresses) {
        var changedAddresses = communityService.getProfileParameters(newAddresses);
        accountApi.updateAccount(changedData, mainContext.getCustomer).$promise;
        accountApi.updateAddresses([changedAddresses], mainContext.getCustomer).$promise;
        document.location.href = "account/login";
    }


    $scope.cancel = function () {
        $scope.user = angular.copy($scope.temp);
    }

    mainContext.getCustomer = $scope.getCustomer = function () {
        customerService.getCurrentCustomer().then(function (response) {
            var addressId = 1;
            _.each(response.data.addresses, function (address) {
                address.id = addressId;
                addressId++;
            });
            response.data.isContact = response.data.memberType === 'Contact';
            mainContext.customer = $scope.customer = response.data;
        });
    };
    $scope.getCustomer();
      
}])
   .factory('mainContext', function () {
       return {};
   });
