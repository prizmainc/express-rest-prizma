import {NextFunction, Request, Response, Router} from "express";
import {AuthModel} from "../models/authModel";

/**
 * / route
 *
 * @class User
 */
export class Authorization {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {

        router.use((req: Request, res: Response, next: NextFunction) => {
            new Authorization().authorize(req, res, next);
        });
    }


    public authorize(req: Request, res: Response, next: NextFunction) {

        // check header or url parameters or post parameters for token
        let token = req.body.token || req.param('token') || req.headers['authorization'];

        if (token) {
            AuthModel.verifyUser(token, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' + err});
                } else {
                    req.param['decoded'] = decoded; //save to request for use in other routes
                    next();
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
        next();
    }
}