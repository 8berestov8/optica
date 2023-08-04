module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/sms/signup',
            handler: 'sms.signup',
            config: {
                policies: [],
                middlewares: []
            }
        },
        {
            method: 'POST',
            path: '/sms/fcm',
            handler: 'sms.fcm',
            config: {
                policies: [],
                middlewares: []
            }
        },
        {
            method: 'DELETE',
            path: '/sms/fcm',
            handler: 'sms.deleteFcm',
            config: {
                policies: [],
                middlewares: []
            }
        },
        {
            method: 'GET',
            path: '/sms/test',
            handler: 'sms.test',
            config: {}
        },
        {
            method: 'POST',
            path: '/sms/callback',
            handler: 'sms.validate',
            config: {
                policies: [],
                middlewares: []
            }
        }
        // {
        //  method: 'GET',
        //  path: '/sms',
        //  handler: 'sms.exampleAction',
        //  config: {
        //    policies: [],
        //    middlewares: [],
        //  },
        // },
    ],
};
//# sourceMappingURL=sms.js.map