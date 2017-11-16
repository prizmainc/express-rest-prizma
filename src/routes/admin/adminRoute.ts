import {NextFunction, Request, Response, Router} from "express";
import {BaseRoute} from "../baseRoute";


/**
 * / route
 *
 * @class User
 */
export class AdminRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(role:number, router: Router) {

        router.get("/admin", (req: Request, res: Response, next: NextFunction) => {
            let adminRoute = new AdminRoute();
            adminRoute.roleAuth(role, req, res, next);
            adminRoute.index(req, res, next);
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
        res.send('Admin home page');
    }
}