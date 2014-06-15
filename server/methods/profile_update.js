Meteor.methods({
    'setPicture': function(pictureId) {
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(404, 'Error 404: Not found');
        }
        var currentPicture = Images.findOne({
            $and: [{
                userId: user._id
            }, {
                isPicture: true
            }]
        });
        Images.update({
            _id: currentPicture._id
        }, {
            $set: {
                isPicture: false
            }
        });
        Images.update({
            _id: pictureId
        }, {
            $set: {
                isPicture: true
            }
        });
    },
    'editProfile': function(profile) {
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(404, 'Error 404: Not found');
        }
        _.extend(user.profile, profile);
        Meteor.users.update({
            _id: user._id
        }, {
            $set: {
                profile: user.profile
            }
        });
    },
    'setImage': function(imageId) {
        var user = Meteor.user();
        if (!user) {
            throw new Meteor.Error(404, 'Error 404: Not found');
        }
        var image = Images.findOne({
            _id: imageId
        });
        if (!image) {
            throw new Meteor.Error(404, 'Error 404: Not found');
        }
        Images.update({
            _id: imageId
        }, {
            $set: {
                userId: user._id,
                isPicture: false
            }
        });
    }
});