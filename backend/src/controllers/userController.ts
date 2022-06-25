import "reflect-metadata";
import { ulid } from "ulid";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { db } from "../database";
import { User } from "../entity/User";
import { Message, UserData } from "../types";

export const read = async (req: Request, res: Response) => {
    try {
        // get id from body
        const id = req.body.id as string;
        // if body is not exist, return error
        if (id == null) {
            res.status(404);
            res.json(generateMessage("id is not found in request body", "err"));
        }

        const userRepository = db.getRepository(User);
        const userData = await userRepository.findOneBy({id});

        // If userdata is not exist
        if (userData == null) {
            res.status(404);
            res.json(generateMessage("Not found with id: " + req.body.id, "err"));
        }
        
        res.status(200);
        res.json(generateMessage(userData, "ok"));
    } catch (error) {
        res.status(400);
        res.json(generateMessage("Some error has occurred", "err"))
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
        res.status(400);
        console.log(error);
        
        res.json(generateMessage("Some error has occured", "err"))
    }
}

export const destroy = async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id as string;
        if(id == null) {
            res.status(400);
            res.json(generateMessage("id is not found in request body", "err"));
        }
        const userRepository = db.getRepository(User);
        const userData = await userRepository.findOneBy({id});
        
        if(userData == null) {
            res.status(404);
            res.json(generateMessage("Not found with id: ", id))
        }

        await userRepository.delete({id});
        res.status(200);
        res.json(generateMessage("User deleted successfully", "ok"));
    } catch (error) {
        res.status(400);
        res.json(generateMessage("Some error has occured", "err"));
    }
}

const generateMessage = (data: any, status: string): Message => {
    return {
        data, status, date: new Date().toISOString()
    }
}