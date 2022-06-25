// Import express from module
import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./routers/userRouter";
import { rootRouter } from "./routers/rootRouter";

class Server {
    private app: express.Application;
    private port: string = process.env.PORT || "8000";

    constructor(port: string) {
        this.app = express();
        this.port = port;
        this.middlewares();
        this.routers();
    }

    // middlewares
    middlewares(): void {
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(express.json());
    }

    // define api req/res route
    routers(): void {
        this.app.use("/", rootRouter);
        this.app.use("/api/user", userRouter);
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(404);
            res.end("Not Found in : " + req.path);
            next();
        })
    }

    // launch this server
    launch(): void {
        try {
            this.app.listen(this.port, () => {
                console.log("✅ This server is listening on port " + this.port);
                console.log("http://localhost:" + this.port);

            });
        } catch (error) {
            console.error("🚫 Some error has occurred. \n", error);
        }
    }
}

// Execute Server
const port: string = "8000";
const server = new Server(port);
server.launch();