var fs = Meteor.require('fs'),
    request = Meteor.require('request');

download = function(url, user, isPicture, callback) {
    if ( !! user) {
        var file = new FS.File();
        file.attachData(url, function(error) {
            if (error) throw error;
            _.extend(file, {
                userId: user._id,
                isPicture: isPicture
            });
            Images.insert(file, function(error) {
                if (error) throw error;
                console.log("Image downloaded");
                callback();
            });
        });
    }
};