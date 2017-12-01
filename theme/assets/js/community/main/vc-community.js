var storefrontApp = angular.module('storefrontApp');

storefrontApp.controller('communityController', ['$scope', '$q', '$window', '$location', '$localStorage', 'communityService', 'customerService', function ($scope, $q, $window, $location, $localStorage, communityService, customerService) {

}]);

storefrontApp.value('$routerRootComponent', 'communityModules');

storefrontApp.component('communityManager', {
    templateUrl: 'themes/assets/js/community-manager.tpl.html',
    bindings: {
        loading: '='
    },
    $routeConfig:[
        { path: '/contributor-profile', name: 'ProfileManager', component: 'profileManager' },
        { path: '/get-lisence', name: 'LisenceManager', component: 'lisenceComponent' }
    ],
    controller: ['$scope', 'customerService', function ($scope, customerService) {
        var $ctrl = this;
        $ctrl.loading = false;

        customerService.getCurrentCustomer().then(function (user) {
            if (user.data.userName == "Anonymous") {
                document.location.href = "account/login";
            };
            console.log(user);

            $ctrl.user = user.data;
           
            $ctrl.loading = true;
        })
        console.log($ctrl,'manager');
    }]
});

storefrontApp.component('communityModules', {
    templateUrl: 'themes/assets/js/community/community-modules/community-modules.tpl.html',
    $routeConfig:[
        { path: '/become-contributor', name: 'BecomeContributor', component: 'becomeContributorWizard' },
        { path: '/get-lisence', name: 'LisenceManager', component: 'lisenceComponent' }
    ],
    bindings: {
        customer: '='
    },
    require: '^^communityManager',
    controller: ['$rootScope', function ($rootScope) {
        var $ctrl = this;
    }]
});

storefrontApp.component('becomeContributorWizard', {
    templateUrl: 'themes/assets/js/community/community-modules/become-contributor/become-contributor.tpl.html',
    bindings: {
        customer: '=',
    },
    require: '^^communityManager',
    controller: ['$rootScope', function ($rootScope) {
        var $ctrl = this;

    }]
});

storefrontApp.component('profileManager', {
    templateUrl: 'themes/assets/js/community/community-profile/community-profile.tpl.html',
    bindings: {
        customer: '=',
    },
    require: '^^communityManager',
    controller: ['$scope', '$q', 'communityService', 'customerService', function ($scope, $q, communityService, customerService) {
        var $ctrl = this;
        console.log($ctrl.customer, 'profile');
        if (!_.isEmpty($ctrl.customer.addresses)) {
            if (!angular.isUndefined(_.first($ctrl.customer.addresses).organization))
                $ctrl.customer.organization = _.first($ctrl.customer.addresses).organization;
        }

        var githubAccount = _.find($ctrl.customer.logins, { loginProvider: 'GitHub' });
        var stackExchangeAccount = _.find($ctrl.customer.logins, { loginProvider: 'StackExchange' });

        console.log(stackExchangeAccount, githubAccount);
        if (!angular.isUndefined(githubAccount)) {
            communityService.getGithubProfile(githubAccount.providerKey).then(function (profile) {
                var profile = profile.data;
                communityService.getGithubStatistic(profile.login).then(function (statistic) {
                    $ctrl.github = { poolRequest: statistic.data.total_count };
                    if (!profile.name)
                        $ctrl.github.userName = profile.login;
                    else
                        $ctrl.github.userName = profile.name;

                    communityService.checkUserPersonalData($ctrl.customer, $ctrl.github.poolRequest).then(function (resp) {
                        $ctrl.percentage = resp.percentage;
                        $ctrl.points = resp.points;
                        $ctrl.rating = resp.rating
                        $ctrl.loaded = true;
                        console.log($ctrl);
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
    }]
});



//storefrontApp.component('becomeContributorWizard', {
//    templateUrl: 'themes/assets/js/become-contributor.tpl.html',
//    bindings: {
//         customer: '=',
//    },
//    require: '^^communityManager',
//    controller: ['$rootScope', function ($rootScope) {
//        var $ctrl = this;
        
//    }]
//});


