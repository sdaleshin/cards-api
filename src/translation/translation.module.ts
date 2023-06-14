import { forwardRef, Module } from '@nestjs/common'
import { TranslationController } from './translation.controller'
import { TranslationService } from './translation.service'
import { AuthModule } from '../auth/auth.module'

@Module({
    controllers: [TranslationController],
    providers: [TranslationService],
    imports: [forwardRef(() => AuthModule)],
})
export class TranslationModule {}
