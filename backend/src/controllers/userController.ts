import "reflect-metadata";
import { ulid } from "ulid";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { db } from "../data-source";
import { User } from "../entity/User";
import { Message, UserData } from "../types";

export const read = async (req: Request, res: Response) => {
    try {
        // get id from body
        const id = req.query.id as string;
        // if body is not exist, return error
        if (id == null) {
            return res.status(404).json(generateMessage("id is not found in request body", "err"));
        }

        const userRepository = db.getRepository(User);
        const userData = await userRepository.findOneBy({ id });

        // If userdata is not exist
        if (userData == null) {
            return res.status(404).json(generateMessage("Not found with id: " + id, "err"));
        }

        return res.status(200).json(generateMessage(userData, "ok"));
    } catch (error) {
        return res.status(400).json(generateMessage("Some error has occurred", "err"))
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        // Repositoryを取得
        const userRepository: Repository<User> = db.getRepository(User);
        // 新しいulid値を生成
        const id: string = ulid();
        // データを構築
        const userData: UserData = {
            id: id,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
        // DBにデータを挿入
        await userRepository.insert(userData);

        res.status(200);
        res.json(generateMessage(userData, "ok"));
    } catch (error) {
        return res.status(400).json(generateMessage("Some error has occured", "err"))
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const userRepository: Repository<User> = db.getRepository(User);
        const id: string = req.body.id as string;
        const userData = await userRepository.findOneBy({ id });

        if (userData == null) {
            return res.status(404).json(generateMessage("User Id Not Found", "err"));
        }
        // データを構築
        const newUserData: UserData = {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
        await userRepository.update(id, newUserData);
        return res.status(200).json(generateMessage(newUserData, "ok"));
    } catch (error) {
        return res.status(400).json(generateMessage("Some error has occurred", "err"));
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id as string;
        if (id == null) {
            return res.status(400).json(generateMessage("id is not found in request body", "err"));
        }
        const userRepository = db.getRepository(User);
        const userData = await userRepository.findOneBy({ id });

        if (userData == null) {
            return res.status(404).json(generateMessage("Not found with id: " + id, id))
        }

        await userRepository.delete({ id });
        return res.status(200).json(generateMessage("User deleted successfully", "ok"));
    } catch (error) {
        return res.status(400).json(generateMessage("Some error has occured", "err"));
    }
}

const generateMessage = (data: any, status: string): Message => {
    return {
        data, status, date: new Date().toISOString()
    }
}