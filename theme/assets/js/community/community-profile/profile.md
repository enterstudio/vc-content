---
title: Virto commerce - Enterprise .NET open-source ecommerce cloud platform. About Us
description: Virto commerce - Enterprise .NET open-source ecommerce cloud platform. About Us
date: 2014-01-30
permalink: account/profile
---
<div ng-controller="accountController" class="vc-contributor">
    <div class="bg-banner">
        <div class="banner-t">Profile</div>
    </div>
    <form ng-init="initialize()" class="responsive">
        <div class="columns">
            <div class="column">
                <div class="control-group">
                    <label>First Name</label>
                    <input ng-model="user.firstName" type="text" class="form-input">
                </div>
                <div class="control-group">
                    <label>Last Name</label>
                    <input ng-model="user.lastName" type="text" class="form-input">
                </div>
                <div class="control-group">
                    <label>Organization</label>
                    <input ng-model="newAddresses.organization" type="text" class="form-input">
                </div>
                <div class="control-group right">
                    <a ng-click="updateAccount(user,newAddresses);" class="button fill">Save</a>
                    <a href="https://localhost:44320/store/vccom/vc-comunity" class="button fill">Cancel</a>
                </div>
            </div>
        </div>
    </form>
</div>
