import { forwardRef, Module } from '@nestjs/common'
import { TranslationController } from './translation.controller'
import { TranslationService } from './translation.service'
import { AuthModule } from '../auth/auth.module'
import { DictionaryModule } from '../dictionary/dictionary.module'

@Module({
    controllers: [TranslationController],
    providers: [TranslationService],
    imports: [forwardRef(() => AuthModule), forwardRef(() => DictionaryModule)],
})
export class TranslationModule {}
