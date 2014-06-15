var fbSettings = Meteor.settings.fb;
Facebook = function(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {
            maxSockets: Infinity
        },
        headers: {
            connection: "keep-alive"
        }
    };
    this.fb.setOptions(this.options);
};

Facebook.prototype.query = function(query, method) {
    var self = this,
        data;

    method = (typeof method === 'undefined') ? 'get' : method;
    data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });

    return data.result;
};

Facebook.prototype.getUserData = function() {
    //move query to config file
    return this.query(fbSettings.userData);
};
Facebook.prototype.getUserPhotos = function() {
    return this.query(fbSettings.userPhotos);
};

Facebook.prototype.getUserPicture = function() {
    var smallPicture = this.query(fbSettings.userPicture).picture.data.url;
    var smallPictureId = smallPicture.match(/_(\d+)_/)[1];
    return this.query(smallPictureId);
};