import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    )

    const config = new DocumentBuilder()
        .setTitle('Flash cards api 1')
        .setDescription('REST api documentation')
        .setVersion('0.0.1')
        .addTag('cards.furnas api test')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.enableCors()

    await app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server started on port ${PORT}`)
    })
}

bootstrap()
