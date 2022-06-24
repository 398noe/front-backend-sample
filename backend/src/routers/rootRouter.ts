import { Router, Request, Response } from "express";

export const rootRouter = Router();

rootRouter.get(
    "/",
    (req: Request, res: Response) => {
        res.status(200);
        res.send("This is backend API");
    }
);