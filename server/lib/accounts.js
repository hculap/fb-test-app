var fbGetUserData = function(user) {
    var data = {},
        token, fb;
    if (user && user.services.facebook) {
        token = user.services.facebook.accessToken;
        fb = new Facebook(token);
        data = fb.getUserData();
    }
    data.birthday = new Date(data.birthday);
    data.hometown = data.hometown.name;
    data.location = data.location.name;
    return data;
}
var getUserPhotos = function(user) {
    var Future = Npm.require('fibers/future'),
        myFuture = new Future(),
        photos = [],
        token, fb;
    if (user && user.services.facebook) {
        token = user.services.facebook.accessToken;
        fb = new Facebook(token);
        var it = 0;
        photos = fb.getUserPhotos().data;
        var downloadCallback = function() {
            if (photos.length > 0) {
                download(photos.shift().source, user, false, downloadCallback);
                it++;
            }
        };
        var profilImg = fb.getUserPicture();
        download(profilImg.source, user, true, downloadCallback);
        myFuture['return']();

    } else {
        throw myFuture['throw']('Error');
    }

    return myFuture.wait();
}

Accounts.onCreateUser(function(options, user) {
    getUserPhotos(user);
    if (options.profile)
        _.extend(options.profile, fbGetUserData(user));
    user.profile = options.profile;
    return user;
});