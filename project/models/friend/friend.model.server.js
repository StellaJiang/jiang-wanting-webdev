/**
 * Created by Wanting on 12/7/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");
    var friendSchema = require("./friend.schema.server")();
    var friendModel = mongoose.model("friendModel", friendSchema);

    var api = {
        addFriend: addFriend,
        getFollowing: getFollowing,
        getFollower: getFollower,
        deleteFriend: deleteFriend
    };
    return api;

    function addFriend(relation){
        return friendModel.create(relation);
    }

    function getFollowing(uid){
        return friendModel.find({
            _user: uid
        });
    }

    function getFollower(uid){
        return friendModel.find({
            friendId: uid
        });
    }

    function deleteFriend(rid){
        return friendModel
            .remove({
                _id: rid
            })
    }
};