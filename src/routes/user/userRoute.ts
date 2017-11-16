import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "../baseRoute";


/**
 * / route
 *
 * @class User
 */
export class UserRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(role:number, router: Router) {

        router.get("/user", (req: Request, res: Response, next: NextFunction) => {
            let userRoute = new UserRoute();
            userRoute.roleAuth(role, req, res, next);
            userRoute.index(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction) {
        res.send('User home page');
    }
}