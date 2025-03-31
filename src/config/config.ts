import { config } from "dotenv";
config();

type ServerConfig = {
	port: number;
};

export const serverConfig: ServerConfig = {
    port: Number(process.env.PORT) || 3310,
}