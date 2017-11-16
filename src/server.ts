import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import {IndexRoute} from "./routes/public/indexRoute";
import {AuthRoute} from "./routes/public/authRoute";
import {AdminRoute} from "./routes/admin/adminRoute";
import {UserRoute} from "./routes/user/userRoute";
import {Authorization} from "./middlewares/authorization";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.publicRoutes();

        this.authorization();

        this.authorizedRoutes();

        //add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //configure hbs
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "hbs");

        //mount logger
        this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parser middleware
        this.app.use(cookieParser());

        //mount override?
        this.app.use(methodOverride());

        // catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method config
     * @return void
     */
    private publicRoutes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        AuthRoute.create(router);

        //use router middleware
        this.app.use(router);
    }

    private authorizedRoutes() {
        let router: express.Router;
        router = express.Router();

        AdminRoute.create(1,router);

        UserRoute.create(2, router);

        //use router middleware
        this.app.use(router);
    }

    private authorization(){
        let router: express.Router;
        router = express.Router();
        Authorization.create(router);
        this.app.use(router);
    }

}
