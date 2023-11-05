import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SettingsService } from './settings.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Settings } from './settings.model'
import { JwtTokenPayload } from '../auth/auth.type'
import { FoldersService } from '../folders/folders.service'

interface Request {
    user: JwtTokenPayload
}

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
    constructor(
        private settingsService: SettingsService,
        private folderService: FoldersService,
    ) {}

    @ApiOperation({ summary: 'Get settings for current user' })
    @ApiResponse({ status: 200, type: Settings })
    @UseGuards(JwtAuthGuard)
    @Get()
    async getSettings(@Req() request: Request) {
        const userId = request.user.id
        let settings = await this.settingsService.getSettingsByUserId(userId)
        if (!settings) {
            const defaultFolder = await this.folderService.createDefaultFolder(
                userId,
            )
            const extensionFolder =
                await this.folderService.createChromeExtensionFolder(userId)
            settings = await this.settingsService.createSettings({
                dictionaryFolderId: defaultFolder.id,
                extensionTranslationFolderId: extensionFolder.id,
                userId: request.user.id,
            })
        }
        return settings
    }

    @ApiOperation({ summary: 'Update settings for current user' })
    @ApiResponse({ status: 200, type: Settings })
    @UseGuards(JwtAuthGuard)
    @Put()
    async updateSettings(@Body() updateSettingsDto, @Req() request: Request) {
        const userId = request.user.id
        const settings = await this.settingsService.getSettingsByUserId(userId)
        if (!settings) {
            throw new HttpException('Settings not found', HttpStatus.NOT_FOUND)
        }
        return await this.settingsService.updateSettings(
            settings.id,
            updateSettingsDto,
        )
    }
}
