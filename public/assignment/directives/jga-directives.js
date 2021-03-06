/**
 * Created by Wanting on 11/3/16.
 */

(function(){
    angular
        .module("wamDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    sort: function(event, ui) {
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        end = ui.item.index();
                        if(start >= end) {
                            end++;
                        }
                        else {
                            start++;
                            end++;
                        }
                        scope.jgaSortableCallback({start: start, end: end});
                    }
                });
        }
        return {
            scope: {
                jgaSortableCallback: '&'
            },
            link: link
        };

    }
})();