---
title: Virto commerce - Enterprise .NET open-source ecommerce cloud platform. About Us
description: Virto commerce - Enterprise .NET open-source ecommerce cloud platform. About Us
date: 2014-01-30
permalink: vc-comunity
---
<div ng-app="storefrontApp" ng-controller="communityController" class="vc-comunity">
    <div class="bg-banner">
        <div class="banner-inner __responsive">
            <div class="banner-t">Virto commerce community</div>
            <a href="/try-now" class="button fill">Request demo & Trial</a>
        </div>
    </div>
    <div ng-show="loaded" class="vc-content __responsive">
        <div class="vc-cnt">
            <community-manager></<community-manager>
        </div>
        <div class="vc-sidebar">
            <div class="aside" data-name="profile">
                <div class="aside-t">Profile <span ng-bind="('(completed') + ' ' + (percentage) + ('%)')"></span></div>
                <div class="aside-other" >
                    <span style="font-size: 12pt;font-weight: 700;" ng-bind="user.fullName"></span>
                    <span ng-if="user.organization" ng-bind="'(' + user.organization + ')'"></span>
                </div>
                <p><a href="account/profile">Add info</a></p>
                <p ng-bind="'(Point - ' + points + ')'"></p>
            </div>
            <div class="aside">
                <div class="aside-t"><img src="so-ico.png" alt=""> Stackoverflow</div>
                <a ng-hide="stackExchange" href="account/externallogin?authType=StackExchange">Link account</a>
                <div ng-show="stackExchange">
                    <p>Name – <span ng-bind="stackExchange.userName"></span></p>
                    <p>Virtocommerce tag rating – <span ng-bind="stackExchange.raiting"></span></p>
                    <p>Answer – <span ng-bind="stackExchange.answers"></span></p>
                    <p>Questions – <span ng-bind="stackExchange.questions"></span></p>
                </div>
            </div>
            <div class="aside">
                <div class="aside-t"><img src="gh-ico.png" alt=""> Github</div>
                <a ng-hide="github" href="account/externallogin?authType=GitHub">Link account</a>
                <div ng-show="github">
                    <p>Name – <span ng-bind="github.userName"></span></p>
                    <p>Virto commerce rating – <span ng-bind="rating"></span></p>
                    <p>Pool request – <span ng-bind="github.poolRequest"></span></p>
                </div>
            </div>
        </div>
    </div>
</div>
