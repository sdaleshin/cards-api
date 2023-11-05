import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Settings, SettingsCreationAttrs } from './settings.model'
import { UpdateSettingsDto } from './dto/UpdateSettingsDto'

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(Settings) private settingsRepository: typeof Settings,
    ) {}

    async createSettings(settingsCreationAttrs: SettingsCreationAttrs) {
        return await this.settingsRepository.create(settingsCreationAttrs)
    }

    async getSettingsByUserId(userId: string) {
        return await this.settingsRepository.findOne({ where: { userId } })
    }

    async updateSettings(
        settingsId: string,
        updateSettingsDto: UpdateSettingsDto,
    ) {
        const settings = await this.settingsRepository.findByPk(settingsId)
        if (!settings) {
            throw new HttpException('Settings not found', HttpStatus.NOT_FOUND)
        }
        settings.dictionaryFolderId = updateSettingsDto.dictionaryFolderId
        settings.extensionTranslationFolderId =
            updateSettingsDto.extensionTranslationFolderId
        await settings.save()
        return settings
    }
}
