import { Sequelize } from "sequelize";
const sequelize = new Sequelize("tutorials-db", "user", "pass", {
    dialect: "sqlite",
    host: "./dev.sqlite",
});
export default sequelize;
