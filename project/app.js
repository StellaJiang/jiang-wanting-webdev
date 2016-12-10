/**
 * Created by Wanting on 12/4/16.
 */
module.exports = function(app) {
    var model = require("./models/models.server")();
    require("./services/user.service.server.js")(app, model);
    require("./services/review.service.server.js")(app, model);
    require("./services/friend.service.server.js")(app, model);
};