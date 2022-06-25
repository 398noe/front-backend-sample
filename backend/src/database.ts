import { DataSource } from "typeorm";

export const db = new DataSource({
    type: "sqlite",
    database: "database/database.sqlite3",
    synchronize: true,
    logging: true
});

db.initialize()
    .then(() => {
        console.log("Data Source has been initialized");        
    })
    .catch((err) => {
        console.error("Errur during initialization", err);
    })
