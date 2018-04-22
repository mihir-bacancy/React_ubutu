### 2Tube Node API
----------------------
#### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ node server.js
```

For production environments...

```sh
$ npm install --production
$ PROD=true forever start server.js
```

Install MongoDB
[MongoDB on MAC] => https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

Start MongoDB
```sh
$ mongod
```
Create super user
```sh
$ mongo
> use admin
> db.createUser({user:"someadmin",pwd:"secret", roles:[{role:"root"}]})
> exit
```
Restart Mongo service
```sh
$ sudo service mongod stop
$ sudo service mongod start
```

DB Tools :
1. Use Rock Mongo [PHP, Apache]
=> https://github.com/iwind/rockmongo

2. Use Robo Mongo
=> https://robomongo.org/

Change DB config file
1. Go to ```src/config.js```
2. Change ```mongoDB``` key's value