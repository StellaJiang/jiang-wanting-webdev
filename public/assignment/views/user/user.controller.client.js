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
            UserService.findUserByCredentials(vm.user.username, vm.user.password, function(user){
                if(user != null) {
                    $location.url("/user/"+user._id);
                }
            });
        }
    }

    function RegisterController($location, $routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;
        vm.updateUser = updateUser;

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

    function ProfileController($location, $routeParams,UserService) {
        var vm = this;

        var userId = $routeParams.uid; //$routeParams["uid"]

        function init(){
            var currentUser = UserService.findUserById(userId);
            if(currentUser!=null){
                vm.user = currentUser;
            }
            else{
                $location.url("/login");
            }
        }
        init();



        function updateUser() {
            var user = vm.user;
            user[_id] = $routeParams.uid;
            UserService.updateUser($routeParams.uid, user);
        }



        function toProfile() {
            $location.url("/user/" + $routeParams.uid);
        }

        function toWebsite() {
            $location.url("/user/" + $routeParams.uid +"/website");
        }
    }
})();