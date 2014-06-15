Template.profileEdit.helpers({
    images: function() {
        return Images.find({
            userId: this._id
        });
    }
});

Template.profileEdit.events({
    'click .img-remove': function(e) {
        e.stopPropagation();
        e.preventDefault();
        Images.remove({
            _id: this._id
        });
    },
    'click .img-set': function(e) {
        e.stopPropagation();
        e.preventDefault();
        Meteor.call('setPicture', this._id);
    },
    'submit #edit-form': function(e) {
        e.stopPropagation();
        e.preventDefault();
        var profile = {};
        $(e.target).serializeArray().forEach(function(input) {
            profile[input.name] = input.value;
        });
        Meteor.call('editProfile', profile);
    },
    'change .img-input': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            var image = Images.insert(file);
            Meteor.call('setImage', image._id);
        });
    }
});