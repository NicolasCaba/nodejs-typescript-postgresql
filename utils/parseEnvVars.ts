import dotenv from "dotenv";
dotenv.config();

export function extractStringEnvVar(
    key: string,
): string {
    const value = process.env[key];

    if (value === undefined) {
        const message = `The environment variable "${key}" cannot be "undefined". ${value}`;

        throw new Error(message);
    }

    return value;
}