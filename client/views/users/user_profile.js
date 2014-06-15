Template.userProfile.helpers({
    images: function() {
        return Images.find({
            userId: this._id
        });
    },
    thisUser: function() {
        return Meteor.user()._id === this._id;
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