import { Router, Request, Response } from "express";
import { getAllUser, addUser, getOneUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.get(
    "/",
    (req: Request, res: Response) => {
        // get id if exists
        if(req.query.id) {
            getOneUser(req, res);
        } else {
            getAllUser(req, res);
        }
    }
);

userRouter.post(
    "/new",
    (req: Request, res: Response) => {
        addUser(req, res);
    }
)