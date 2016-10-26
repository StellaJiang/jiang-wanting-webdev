/**
 * Created by Wanting on 10/25/16.
 */


module.exports = function(app) {
    console.log("hello from app.js");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    //require("./services/widget.service.server.js")(app);
};