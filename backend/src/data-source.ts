import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { User } from "./entity/User"

const config: DataSourceOptions = {
    type: "sqlite",
    database: "./database/database.sqlite3",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ["src/migration/**/*.ts"],
}

export const db = new DataSource(config);

db.initialize()
    .then(() => {
        console.log("Data Source has been initialized");        
    })
    .catch((err) => {
        console.error("Errur during initialization", err);
    })
