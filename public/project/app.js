/**
 * Created by Wanting on 12/4/16.
 */
(function(){
    angular
        .module("MovieApp",["ngRoute", "movieDirective", "passwordVerify"])
        .controller("ValidationController", ValidationController);

    function ValidationController(){
        var vm = this;
    }
})();