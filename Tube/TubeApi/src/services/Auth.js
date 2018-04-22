const crypto = require('crypto');
const moment = require('moment');
const UsersModal = require('../model/users');
const config = require('../config');
const algorithm = 'aes-256-ctr';

const encryptText = async (text)  => {
    let cipher = crypto.createCipheriv(algorithm,config.cypherKey);
    let crypted = cipher.update(text+config.tokenValidator+moment().format('x'),'utf8','base64');
    crypted += cipher.final('base64');
    return crypted;
}

const decryptText = async (text) => {
    let decipher = crypto.createDecipher(algorithm,config.cypherKey);
    let dec = decipher.update(text,'base64','utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports = {

    encrypt: async function(text) {
        return await encryptText(text);
    },

    decrypt: async function(text) {
        return await decryptText(text);
    },

    validateToken: async function (req, res, next) {
        const { authorization } = req.headers;
        new Promise( async (resolve, reject)=> {
            if (authorization && authorization != '') {
                let tokenSplitter = String(await decryptText(authorization)).split(config.tokenValidator);

                if(tokenSplitter.length > 1 && !isNaN(parseInt(tokenSplitter[1]))) {

                    // Check token expiration
                    /*if(moment().diff(parseInt(tokenSplitter[1]), 'seconds') > config.tokenExpire) {
                        resolve({status:false, message:'Authorization token has been expired!'});
                    }*/

                    UsersModal.findById(tokenSplitter[0], (userRes) => {
                        (Object.keys(userRes).length > 0)
                            ? resolve({status:true, user:userRes})
                            : resolve({status:false, message:'Invalid authorization token!'});
                    });

                } else {
                    resolve({status:false, message:'Invalid authorization token!'});
                }

            } else {
                resolve({status:false, message:'Authorization token must be required!'});
            }
        }).then(({status,message, user}) => {
            req['user'] = (status) ? user : null;
            (status) ? next() : res.json({status,message});
        });
    }

};
