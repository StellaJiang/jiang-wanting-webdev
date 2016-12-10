/**
 * Created by Wanting on 12/4/16.
 */

(function() {
    angular
        .module("MovieApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("UserPasswordController", UserPasswordController)
        .controller("AdminUserListController", AdminUserListController)
        .controller("AdminUserDetailController", AdminUserDetailController)
        .controller("AdminChangePasswordController", AdminChangePasswordController);

        function LoginController($location, $scope, UserService){
            var vm = this;
            vm.UserLogin = login;
            $scope.errorShow = false;

            function login() {
                if(document.getElementById("myForm").checkValidity()) {
                    UserService
                        .login(vm.user)
                        .success(function (user) {
                            if (user === '0') {
                                $scope.errorShow = true;
                            }
                            else {
                                if(user.admin) {
                                    $location.url("/admin/" + user._id + "/user");
                                }
                                else {
                                    $location.url("/user/" + user._id);
                                }
                            }
                        })
                        .catch(function (user) {
                            $scope.errorShow = true;
                            console.log("error from login");
                        });
                }
            }
        }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser() {
            if(document.getElementById("myForm").checkValidity()) {
                vm.user["following"] = [];
                UserService
                    .createUser(vm.user)
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

        var userId = $rootScope.currentUser._id;
        vm.updateProfile = updateProfile;
        vm.logout = logout;

        function init() {
            $scope.changePasswordShow = true;
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                        if(user.facebook != null) {
                            $scope.changePasswordShow = false;
                        }
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function updateProfile() {
            var updateUser = {};
            updateUser["_id"] = userId;
            updateUser["username"] = $scope.user.username;
            updateUser["firstName"] = $scope.user.firstName;
            updateUser["lastName"] = $scope.user.lastName;
            updateUser["email"] = $scope.user.email;
            UserService
                .updateUser($routeParams.uid, updateUser)
                .success(function (user) {
                    $location.url("/user/" + userId);
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }

    }

    function UserPasswordController($location, $scope, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.logout = logout;
        vm.updatePassword = updatePassword;

        function init() {
            $scope.errorShow = false;
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }

        function updatePassword(){
            var oldPassword = document.getElementById("password").value;
            var newPassword = document.getElementById("newPassword").value;
            var updated= {
                oldPassword: oldPassword,
                newPassword: newPassword
            }


            UserService
                .updatePassword(userId, updated)
                .success(function (status) {
                    if (status === '0') {
                        $scope.errorShow = true;
                    }
                    else {
                        $location.url("/user/" + userId);
                    }
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }

    function AdminUserListController($location, $scope, $routeParams, UserService){
        var vm = this;
        var userId = $routeParams.aid;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            UserService
                .findAllUsers()
                .success(function (users) {
                    if (users === '0') {
                        $location.url("/login");
                    }
                    else {
                        vm.users = users;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }

    function AdminUserDetailController($location, $scope, $routeParams, UserService){
        var vm = this;
        var userId = $routeParams.aid;
        var detailId = $routeParams.uid;
        vm.logout = logout;
        vm.updateProfile = updateProfile;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });

            UserService
                .findUserById(detailId)
                .success(function (user) {
                    if (user) {
                        vm.detail = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }

        function updateProfile() {
            var updateUser = {};
            updateUser["_id"] = userId;
            updateUser["username"] = vm.detail.username;
            updateUser["firstName"] = vm.detail.firstName;
            updateUser["lastName"] = vm.detail.lastName;
            updateUser["email"] = vm.detail.email;
            UserService
                .updateUser(detailId, updateUser)
                .success(function (user) {
                    $location.url("/admin/"+ userId +"/user");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }
    }

    function AdminChangePasswordController($location, $scope, $routeParams, UserService){
        var vm = this;
        var userId = $routeParams.aid;
        var detailId = $routeParams.uid;
        vm.detailId = detailId;
        vm.logout = logout;
        vm.updatePassword = updatePassword;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user) {
                    if (user === '0') {
                        $location.url("/login");
                    }
                    else {
                        $scope.user = user;
                    }
                })
                .catch(function (error) {
                    console.log("error from profile");
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .success(function (status) {
                    $location.url("/login");
                })
                .catch(function (error) {
                    console.log("error from profile update");
                });
        }

        function updatePassword() {
            if(document.getElementById("myForm").checkValidity()) {
                var newPassword = document.getElementById("newPassword").value;
                var password = {
                    newPassword: newPassword
                };

                UserService
                    .adminUpdatePassword(detailId, password)
                    .success(function (status) {
                        $location.url("/admin/" + userId + "/user/" + detailId);
                    })
                    .catch(function (error) {
                        console.log("error from profile update");
                    });
            }
        }
    }
})();
