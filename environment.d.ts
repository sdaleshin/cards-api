declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number
            PG_USERNAME: string
            PG_PASSWORD: string
            PG_HOST: string
            PG_PORT: number
            PG_DB_NAME: string
            JWT_PRIVATE_KEY: string
            JWT_REFRESH_KEY: string
            OPEN_AI_KEY: string
        }
    }
}
export {}
