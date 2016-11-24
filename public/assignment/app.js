/**
 * Created by Wanting on 10/10/16.
 */

(function(){
    angular
        .module("WebAppMaker",["ngRoute", "textAngular", "wamDirectives", "passwordVerify"])
        .controller("ValidationController", ValidationController);

    function ValidationController(){
        var vm = this;
    }
})();