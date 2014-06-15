Router.configure({
    layoutTemplate: 'masterLayout',
});

Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('usersList', {
        path: '/users'
    });

    this.route('userProfile', {
        path: '/users/:_id',
        data: function() {
            return Meteor.users.findOne(this.params._id);
        }
    });
    this.route('profileEdit', {
        path: '/users/:_id/edit',
        data: function() {
            return Meteor.users.findOne(this.params._id);
        },
        onBeforeAction: function(pause) {
            if (Meteor.user()) {
                if (this.params._id !== Meteor.user()._id) {
                    Router.go('userProfile', {
                        _id: this.params._id
                    });

                    pause();
                }
            } else {
                Router.go('userProfile', {
                    _id: this.params._id
                });
                pause();
            }
        }
    });
});