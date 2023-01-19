import express, { Application } from "express";
import userRoutes from "../routes/usuario";
import cors from "cors";
import sequelize from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        // cors
        this.app.use(cors());
        // body
        this.app.use(express.json());
        // static assets
        this.app.use(express.static('public'))
    }

    async dbConnection() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            throw new Error(`Unable to connect to the database: ${error}`);
        }
    }

    routes(): void {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('App runing on port ', this.port);
        });
    }
}

export default Server;