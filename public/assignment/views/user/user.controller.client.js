/**
 * Created by Wanting on 10/11/16.
 */
(function(){
    "use strict";
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.UserLogin = login;

        function login() {
            if(document.getElementById("myForm").checkValidity()) {
                UserService
                    .login(vm.user)
                    .success(function (user) {
                        if (user === '0') {
                            vm.error = "No such user";
                        }
                        else {
                            $location.url("/user/" + user._id);
                        }
                    })
                    .catch(function (user) {
                        console.log("error from login");
                    });
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            console.log(document.getElementById("myForm").checkValidity());
            if(document.getElementById("myForm").checkValidity()) {
                UserService
                    .register(vm.user)
                    .success(function (user) {
                        $location.url("/user/" + user._id);
                    })
                    .catch(function (error) {
                        $location.url("/register");
                    });
            }
        }
    }

    function ProfileController($location, $scope, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

        var userId = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(userId)
                .success(function(user){
                    if(user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function(error){
                    console.log("error from profile");
                });
        }
        init();

        function updateUser() {
            if(document.getElementById("myForm").checkValidity()) {
                var updateUser = {};
                updateUser["_id"] = userId;
                updateUser["username"] = document.getElementById('username').value;
                updateUser["firstName"] = document.getElementById('first-name').value;
                updateUser["lastName"] = document.getElementById('last-name').value;
                updateUser["email"] = document.getElementById('email').value;
                updateUser["password"] = $scope.user.password;
                UserService
                    .updateUser($routeParams.uid, updateUser)
                    .success(function (user) {
                        if (user === '0') {
                            console.log("error from profile update");
                        }
                    })
                    .catch(function (error) {
                        console.log("error from profile update");
                    });
            }
        }

        function unregisterUser(){
            UserService
                .deleteUser(userId)
                .success(function(status){
                    $location.url("/login");
                })
                .catch(function(error){
                    console.log("error from profile update");
                });
        }

        function logout(){
            UserService
                .logout()
                .success(function(status){
                    $location.url("/login");
                })
                .catch(function(error){
                    console.log("error from profile update");
                });
        }
    }
})();