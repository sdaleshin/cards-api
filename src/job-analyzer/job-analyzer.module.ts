import { forwardRef, Module } from '@nestjs/common'
import { JobAnalyzerController } from './job-analyzer.controller'
import { JobAnalyzerService } from './job-analyzer.service'
import { AuthModule } from '../auth/auth.module'
import { DictionaryModule } from '../dictionary/dictionary.module'

@Module({
    controllers: [JobAnalyzerController],
    providers: [JobAnalyzerService],
    imports: [forwardRef(() => AuthModule), forwardRef(() => DictionaryModule)],
})
export class JobAnalyzerModule {}
