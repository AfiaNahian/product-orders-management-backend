import dotenv from 'dotenv';
dotenv.config();

export default {
    db_url: process.env.DB_URL,
    port: process.env.PORT,
}