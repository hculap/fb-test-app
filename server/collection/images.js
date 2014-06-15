var s3Settings = Meteor.settings.s3;
var imageStore = new FS.Store.S3("images", {
    accessKeyId: s3Settings.accessKeyId, //required if environment variables are not set
    secretAccessKey: s3Settings.secretAccessKey, //required if environment variables are not set
    bucket: s3Settings.bucket, //required
});

Images = new FS.Collection("images", {
    stores: [imageStore]
});