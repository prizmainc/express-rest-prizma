# setup express-rest-prizma

-------if oracle prerequisites not available to run project do only followings---------

1. prerequisites for windows
   https://community.oracle.com/docs/DOC-931127
   
   prerequisites for mac
   https://github.com/oracle/node-oracledb/blob/master/INSTALL.md#instosx

2. cd express-rest-prizma

3. npm install

4. npm run grunt

5. npm start

6. browse http://localhost:3002/ [can change port from www file]

Enjoy express typescript rest with oracle and jwt !!!

# notes for express-rest-prizma

1. http://localhost:3002/auth?username=michel&password=1
   will send an jwt token

   http://localhost:3002/admin?token=Bearer <token>
   will not granted

   http://localhost:3002/user?token=Bearer <token>
   will granted


2. oracle connect sample is in authModel.ts
   replace below code with real connection detals
    const config = {
        user: "<user>",
        password: "<password>",
        connectString: "<connectString>"
    };

   http://localhost:3002/auth2
   will print a user data in console which rendered from oracle connection.





