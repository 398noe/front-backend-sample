import { Router, Request, Response } from "express";
import { create, read, destroy } from "../controllers/userController";

export const userRouter = Router();

userRouter.get(
    "/",
    (req: Request, res: Response) => {
        read(req, res);
    }
);

userRouter.post(
    "/new",
    (req: Request, res: Response) => {
        create(req, res);
    }
)

userRouter.delete(
    "/",
    (req: Request, res: Response) => {
        destroy(req, res);
    }
)