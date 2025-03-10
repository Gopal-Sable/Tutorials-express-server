import { Model, DataTypes } from "sequelize";
import sequelize from "../db/db.js";
class Tutorials extends Model {}
Tutorials.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        sequelize,
        modelName: "Tutorials"
    }
);

export default Tutorials;
