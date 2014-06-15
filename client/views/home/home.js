Template.home.helpers({
    images: function() {
        return Images.find({
            userId: this._id
        });
    },
});