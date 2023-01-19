import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

interface UsuarioAttributes {
    id: number;
    nombre: string;
    email: string;
    estado: boolean;
}

interface UsuarioCreationAttributes 
    extends Optional<UsuarioAttributes, 'id'> {};

interface UsuarioInstance
    extends Model<UsuarioAttributes, UsuarioCreationAttributes>, UsuarioAttributes {
        createdAt?: Date;
        updatedAt?: Date;
    }

const Usuario = sequelize.define<UsuarioInstance>('usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {
        timestamps: true
    }
);

export default Usuario;