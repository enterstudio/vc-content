var storefrontApp = angular.module('storefrontApp');

//storefrontApp
//    .component('vcCommunityMain', {
//        templateUrl: "vc-community.tpl",
//        $routeConfig: [
//            { path: '/', name: 'Main', component: 'vcCommunity' },
//            { path: '/friendsLists', name: 'FriendsLists', component: 'vcAccountFriendsLists' },
//            { path: '/myLists', name: 'MyLists', component: 'vcAccountMyLists', useAsDefault: true }
//        ],
storefrontApp.controller('communityController', ['$scope', '$q', '$window', '$location', '$localStorage', 'communityService', 'customerService', function ($scope, $q, $window, $location, $localStorage, communityService, customerService) {
    $scope.loaded = false;

    customerService.getCurrentCustomer().then(function (user) {
        if (user.data.userName == "Anonymous") {
            document.location.href = "account/login";
        };

        $scope.user = user.data;
        if (!_.isEmpty($scope.user.addresses)) {
            if (!angular.isUndefined(_.first($scope.user.addresses).organization))
                $scope.user.organization = _.first($scope.user.addresses).organization;
        }

        var githubAccount = _.find(user.data.logins, { loginProvider: 'GitHub' });
        var stackExchangeAccount = _.find(user.data.logins, { loginProvider: 'StackExchange' });

        if (!angular.isUndefined(githubAccount)) {
            communityService.getGithubProfile(githubAccount.providerKey).then(function (profile) {
                var profile = profile.data;
                communityService.getGithubStatistic(profile.login).then(function (statistic) {
                    $scope.github = { poolRequest: statistic.data.total_count };
                    if (!profile.name)
                        $scope.github.userName = profile.login;
                    else
                        $scope.github.userName = profile.name;

                    communityService.checkUserPersonalData($scope.user, $scope.github.poolRequest).then(function (resp) {
                        $scope.percentage = resp.percentage;
                        $scope.points = resp.points;
                        $scope.rating = resp.rating
                        $scope.loaded = true;
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
                    $scope.stackExchange = {
                        userName: results[0].data.items[0].display_name,
                        raiting: results[0].data.items[0].reputation,
                        questions: results[1].data.total,
                        answers: results[2].data.total
                    };
                });
        }
        $scope.loaded = true;
    })
}]);
storefrontApp.component('communityManager', {
    template: '<nav>\n' +
    '  <a ng-link="[\'Test\']">Test</a>\n' +
    '  <a ng-link="[\'Heroes\']">Heroes</a>\n' +
    '</nav>\n' +
    '<ng-outlet></ng-outlet>\n',
    $routeConfig: [
        { path: '/', name: 'CommunityManager', component: 'testComponent' },
    ],
});



storefrontApp.component('testComponent', {
    template: '<span>Name: {{asdasdadsads}}</span>',
    controller: ['$rootScope', 'listService', 'customerService', 'loadingIndicatorService', '$timeout', 'accountDialogService', '$localStorage', function ($rootScope, listService, customerService, loader, $timeout, dialogService, $localStorage) {
        var $ctrl = this;
        // bindings: {
        //     hero: '=',
        // },
        //require: {}
    }]
});


