import { Request, Response } from "express";

export const getAllUser = async (req: Request, res: Response) => {
    const user = {
        id: 1,
        name: "Alice",
        age: 32,
        email: "alice@example.com"
    }
    try {
        res.status(200);
        res.json(user);
    } catch (error) {
        res.status(403);
        res.send(error);
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    res.status(200);
    res.json();
}

export const addUser = async (req: Request, res: Response) => {
    res.status(200);
    res.json();
}