import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "../baseRoute";
import {AuthModel} from "../../models/authModel";

export class AuthRoute extends BaseRoute {

    /**
     * Create the auth routes.
     *
     * @class AuthRoute
     * @method create
     * @static
     */
    public static create(router: Router) {

        router.get("/auth", (req: Request, res: Response, next: NextFunction) => {
            new AuthRoute().auth(req, res, next);
        });

        router.get("/auth2", (req: Request, res: Response, next: NextFunction) => {
            new AuthRoute().auth2(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class AuthRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class AuthRoute
     * @method auth
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public auth(req: Request, res: Response, next: NextFunction) {
        if (req.param('username') === undefined || req.param('password') === undefined || req.param('username').trim() === '' || req.param('password').trim() === '') {
            res.send('username & password required');
        }

        AuthModel.authenticate(req.param('username'),  req.param('password'), function (userNotAvailable, passwordIncorrect, token) {
            if(userNotAvailable){
                res.send('no user available');
            }
            if(passwordIncorrect){
                res.send('error password');
            }
            res.json({
                status: 'success',
                token: token
            });
        });
    }

    public auth2(req: Request, res: Response, next: NextFunction) {
       /* if (req.param('username') === undefined || req.param('password') === undefined || req.param('username').trim() === '' || req.param('password').trim() === '') {
            res.send('username & password required');
        }*/

        AuthModel.authenticate2(req.param('username'),  req.param('password'), function (userNotAvailable, passwordIncorrect, token) {
            if(userNotAvailable){
                res.send('no user available');
            }
            if(passwordIncorrect){
                res.send('error password');
            }
            res.json({
                status: 'success',
                token: token
            });
        });
    }
}