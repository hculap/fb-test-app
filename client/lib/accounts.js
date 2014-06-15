/**
 * Permissions to request on facebook api
 */
Accounts.ui.config({
    requestPermissions: {
        facebook: [
            'user_location',
            'user_about_me',
            'user_birthday',
            'user_friends',
            'user_hometown',
            'user_photos',
            'user_videos',
            'email'
        ]
    }
});