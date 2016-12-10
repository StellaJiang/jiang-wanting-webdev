/**
 * Created by Wanting on 12/4/16.
 */
(function () {
    angular
        .module("movieDirective", [])
        .directive("offCanvasMenu", offCanvasMenu);

    function offCanvasMenu() {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element) {
                scope.toggleMenu = function () {
                    $('.row-offcanvas').toggleClass('active');
                };
            }
        };
    }
})();