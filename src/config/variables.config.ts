import * as config from 'config';

const dbConfig = config.get('db');
const serverConfig = config.get('server');
const jwtConfig = config.get('jwt');

export const origin = serverConfig.origin;
export const expiresIn = jwtConfig.expiresIn;
export const secret = process.env.JWT_SECRET || jwtConfig.secret;
export const serverPort = process.env.PORT || serverConfig.port;
export const dbUsername = process.env.DB_USERNAME || dbConfig.username;
export const dbPassword = process.env.DB_PASSWORD || dbConfig.password;
export const dbHost = process.env.DB_HOST || dbConfig.host;
export const dbName = process.env.DB_NAME || dbConfig.database;
