# front-backend-sample

# Setup
### Create SQLite Database
sqlite3 database/database.sqlite3
# Migration Command
npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts

## Memo
create migration file (migration file is already created)
npx typeorm-ts-node-commonjs migration:create ./src/migration/UserMigration