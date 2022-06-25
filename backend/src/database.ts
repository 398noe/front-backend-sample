import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const db = new DataSource({
    type: "sqlite",
    database: "./database/database.sqlite3",
    synchronize: true,
    logging: true,
    entities: [
        User
    ]
});

db.initialize()
    .then(() => {
        console.log("Data Source has been initialized");        
    })
    .catch((err) => {
        console.error("Errur during initialization", err);
    })
