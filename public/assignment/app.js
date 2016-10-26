/**
 * Created by Wanting on 10/10/16.
 */

/*(function(){
    angular
        .module("WebAppMaker",["ngRoute"]);
})();*/

module.exports = function(app) {
    console.log("hello from app.js");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    /*require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);*/
};