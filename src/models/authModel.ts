import * as jwt from "jsonwebtoken";
import * as oracle from "oracledb";

const config = {
    user: "fmsoradbadmin",
    password: "Penola3#Craft",
    connectString: "fmsoradbins.c5ya5a8qzhtp.ap-southeast-2.rds.amazonaws.com:1521/FMSDB"
};

export class AuthModel {



    public static authenticate(usernameSent: String, passwordSent: String, callback: Function) {

        let users = [
            {username: 'hudson', password: '1', roles: [1, 2]},
            {username: 'hugo', password: '1', roles: [1]},
            {username: 'michel', password: '1', roles: [2]}
        ];

        let roles = {1: 'admin', 2: 'user'};

        let userAvailable = false;
        let passwordCorrect = false;
        let selectedUser;
        let token;

        users.forEach(function (user) {
            if (user.username === usernameSent) {
                userAvailable = true;
                if (user.password === passwordSent) {
                    passwordCorrect = true;
                    selectedUser = user;
                    return 0;
                }
            }
        });

        if (selectedUser) {
            token = jwt.sign({"roles": selectedUser.roles, "iat": 1422779638}, 'secretkey', {});
        }

        callback(!userAvailable, !passwordCorrect, token);
    }

    public static verifyUser (token, callback) {

        let tokenWithBarer = token.split(' ');
        // verifies secret and checks expiry date
        jwt.verify(tokenWithBarer[1].trim(), 'secretkey', function(err, decoded) {
            callback(err, decoded);
        });
    };

    public static async authenticate2(usernameSent: String, passwordSent: String, callback: Function) {
        let conn;

        try {
            conn = await oracle.getConnection(config);

            const result = await conn.execute(
                'select USERNAME,PASSWORD_HASH,ROLES from USER_INFO'
            );

            console.log(result.rows[0]);
        } catch (err) {
            console.log('Ouch!', err);
        } finally {
            if (conn) { // conn assignment worked, need to close
                await conn.close();
            }
        }
        callback(true);
    }

}