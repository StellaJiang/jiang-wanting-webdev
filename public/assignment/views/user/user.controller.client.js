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
            var user = UserService.findUserByCredentials(vm.user.username, vm.user.password);
            if(user != null) {
                $location.url("/user/"+user._id);
            }
        }
    }

    function RegisterController($location, $routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            var verify = document.getElementById('verify').value;
            if (vm.user.password == verify) {
                var user = UserService.createUser(vm.user);
                if(user != null) {
                    $location.url("/user/" + user._id);
                }
                else {
                    $location.url("/register");
                }
            }
            else {
                $location.url("/register");
            }
        }
    }

    function ProfileController($location, $scope, $routeParams,UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var userId = $routeParams.uid;

        function init(){
            var currentUser = UserService.findUserById(userId);
            if(currentUser!=null){
                $scope.user = currentUser;
            }
            else{
                $location.url("/login");
            }
        }
        init();

        function updateUser() {
            var updateUser = {};
            updateUser["_id"] = userId;
            updateUser["username"] = document.getElementById('username').value;
            updateUser["firstName"] = document.getElementById('first-name').value;
            updateUser["lastName"] = document.getElementById('last-name').value;
            updateUser["email"] = document.getElementById('email').value;
            updateUser["password"] = $scope.user.password;
            UserService.updateUser($routeParams.uid, updateUser);
        }
    }
})();