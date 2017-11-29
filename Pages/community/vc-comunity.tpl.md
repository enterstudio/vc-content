---
title: Virto commerce - Enterprise .NET open-source ecommerce cloud platform. About Us
description: Virto commerce - Enterprise .NET open-source ecommerce cloud platform. About Us
date: 2014-01-30
permalink: vc-comunity
---
<div id="vc-community.tpl.md" type="text/ng-template" class="vc-comunity">
    <div class="bg-banner">
        <div class="banner-inner __responsive">
            <div class="banner-t">Virto commerce community</div>
            <a href="/try-now" class="button fill">Request demo & Trial</a>
        </div>
    </div>
    <div ng-show="loaded" class="vc-content __responsive">
        <div class="vc-cnt">
            <ul class="list">
                <li class="list-item">
                    <div class="list-inner">
                        <div class="list-img">
                            <img src="become-ico.png" alt="" class="list-ico">
                        </div>
                        <div class="list-t">Become a contributor</div>
                        <div class="list-descr">
                            If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill.
                        </div>
                        <div class="list-actions">
                            <a href="/vc-comunity/become-contributor" class="button fill">Start</a>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="list-inner">
                        <div class="list-img">
                            <img src="licence-ico.png" alt="" class="list-ico">
                        </div>
                        <div class="list-t">Get lisence</div>
                        <div class="list-descr">
                            Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                        <div class="list-actions">
                            <a href="/vc-comunity/become-contributor" class="button fill">Start</a>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="list-inner">
                        <div class="list-img">
                            <img src="become-2-ico.png" alt="" class="list-ico">
                        </div>
                        <div class="list-t">Become a contributor</div>
                        <div class="list-descr">
                            Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                        <div class="list-actions">
                            <a href="/vc-comunity/become-contributor" class="button fill">Start</a>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="list-inner">
                        <div class="list-img">
                            <img src="resource-ico.png" alt="" class="list-ico">
                        </div>
                        <div class="list-t">Community resources</div>
                        <div class="list-descr">
                            <ul>
                                <li>
                                    <a href="/docs">Documentation</a>
                                </li>
                                <li>
                                    <a href="/roadmap">Roadmap</a>
                                </li>
                                <li>
                                    <a href="https://github.com/VirtoCommerce/vc-platform">Github repisitories structure</a>
                                </li>
                                <li>
                                    <a href="#">Stackoverflow channel</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="list-item">
                    <div class="list-inner">
                        <div class="list-img">
                            <img src="app-ico.png" alt="" class="list-ico">
                        </div>
                        <div class="list-t">Add app to marketplace</div>
                        <div class="list-descr">
                            Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>
                        <div class="list-actions">
                            <a href="/vc-comunity/become-contributor" class="button fill">Start</a>
                        </div>
                    </div>
                </li>
            </ul>
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
