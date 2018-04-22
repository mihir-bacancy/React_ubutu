module.exports = {
    Host : (process.env.PROD) ? 'http://52.15.90.90:3000/' : 'http://localhost:3000/',
    mongoDB: (process.env.PROD) ? 'mongodb://localhost/2tube' : 'mongodb://localhost/2tube',
    cypherKey : 'd6F3EfeqAnfAflsGlsr',
    tokenValidator: '_2TUBE_',
    tokenExpire: 86400, // 24 Hours (time in seconds)
    s3bucket: {
        accessKeyId: 'AKIAJGIIIP7AHERT2AIQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    },
    profileImageBucket:'2tube.bucket/profile',
    videoAttemptBucket:'2tube.bucket/attempt',
    videoBucket:'2tube.bucket/video',
    thumb:'2tube.bucket/thumb',
    courseImage:'2tube.bucket/thumb',
    mail: {
        service:'gmail',
        username:'demo.dev.user001@gmail.com',
        password:'demo12345'
    }
};