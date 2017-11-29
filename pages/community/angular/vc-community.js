var storefrontApp = angular.module('storefrontApp');

storefrontApp
    .component('vcCommunityMain', {
        templateUrl: "vc-community.tpl",
        $routeConfig: [
            { path: '/', name: 'Main', component: 'vcCommunity' },
            { path: '/friendsLists', name: 'FriendsLists', component: 'vcAccountFriendsLists' },
            { path: '/myLists', name: 'MyLists', component: 'vcAccountMyLists', useAsDefault: true }
        ],
        controller: ['listService', '$rootScope', '$location', 'customerService', 'cartService', '$translate', 'loadingIndicatorService', '$timeout', 'dialogService', '$localStorage', function (listService, $rootScope, $location, customerService, cartService, $translate, loader, $timeout, dialogService, $localStorage) {
            var $ctrl = this;
            $ctrl.loaded = false;

            customerService.getCurrentCustomer().then(function (user) {
                if (user.data.userName == "Anonymous") {
                    document.location.href = "account/login";
                };

                $ctrl.user = user.data;
                if (!_.isEmpty($ctrl.user.addresses)) {
                    if (!angular.isUndefined(_.first($ctrl.user.addresses).organization))
                        $ctrl.user.organization = _.first($ctrl.user.addresses).organization;
                }

                var githubAccount = _.find(user.data.logins, { loginProvider: 'GitHub' });
                var stackExchangeAccount = _.find(user.data.logins, { loginProvider: 'StackExchange' });

                if (!angular.isUndefined(githubAccount)) {
                    communityService.getGithubProfile(githubAccount.providerKey).then(function (profile) {
                        var profile = profile.data;
                        communityService.getGithubStatistic(profile.login).then(function (statistic) {
                            $ctrl.github = { poolRequest: statistic.data.total_count };
                            if (!profile.name)
                                $ctrl.github.userName = profile.login;
                            else
                                $ctrl.github.userName = profile.name;

                            communityService.checkUserPersonalData($ctrl.user, $ctrl.github.poolRequest).then(function (resp) {
                                $ctrl.percentage = resp.percentage;
                                $ctrl.points = resp.points;
                                $ctrl.rating = resp.rating
                                $ctrl.loaded = true;
                            })
                        })
                    })
                }

                if (!angular.isUndefined(stackExchangeAccount)) {
                    $q.all(
                        [
                            communityService.getStackExchangeProfile(stackExchangeAccount.providerKey),
                            communityService.getStackExchangeQuestions(stackExchangeAccount.providerKey),
                            communityService.getStackExchangeAnswers(stackExchangeAccount.providerKey)
                        ])
                        .then(function (results) {
                            console.log(results[0], results[1], results[2]);
                            $ctrl.stackExchange = {
                                userName: results[0].data.items[0].display_name,
                                raiting: results[0].data.items[0].reputation,
                                questions: results[1].data.total,
                                answers: results[2].data.total
                            };
                        });
                }
                $ctrl.loaded = true;
            })


        }]
    });

storefrontApp.controller('communityController', ['$scope', '$q', '$window', '$location', '$localStorage', 'communityService', 'customerService', function ($scope, $q, $window, $location, $localStorage, communityService, customerService) {
    
   
}]);
