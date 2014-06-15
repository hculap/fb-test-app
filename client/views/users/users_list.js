Template.usersList.helpers({
    users: function() {
        return Meteor.users.find();
    },
    picture: function() {
        return Images.findOne({
            $and: [{
                userId: this._id
            }, {
                isPicture: true
            }]
        });
    }
});