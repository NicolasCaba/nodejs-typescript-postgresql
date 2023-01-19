import dotenv from "dotenv";
import Server from './models/server';

// environment variables config
dotenv.config();

const server = new Server();

server.listen();