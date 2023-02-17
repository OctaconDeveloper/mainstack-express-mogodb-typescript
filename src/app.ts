import helmet from "helmet";
import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import { ApiRoutes } from "./routes/api.routes";
import DBConnection from "./utils/db-connection.util";
import ErrorMiddleware from "./app/middlewares/error.middleware";

class App {

    public app: express.Application;
    private readonly apiRoutes: ApiRoutes = new ApiRoutes();
    private readonly dbConnection: DBConnection = new DBConnection();
 
    constructor() {
        this.app = express();
        this.dbConnection.connect()
        this.config();
        this.apiRoutes.routes(this.app);
        this.app.use(ErrorMiddleware)

    }

    private config(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({ extended: true }));
    }


}

export default new App().app;