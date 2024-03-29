import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Folder, FolderCreationAttrs } from './folder.model'
import { UpdateFolderDto } from './dto/UpdateFolderDto'
import { Sequelize } from 'sequelize-typescript'
import { Card } from '../cards/card.model'

const DEFAULT_FOLDER_NAME = 'Default'
const WORDS_FROM_CHROME_EXTENSION_FOLDER_NAME = 'Words from Chrome extension'

@Injectable()
export class FoldersService {
    constructor(@InjectModel(Folder) private folderRepository: typeof Folder) {}

    async createFolder(folderCreationAttrs: FolderCreationAttrs) {
        return await this.folderRepository.create(folderCreationAttrs)
    }

    async createDefaultFolder(userId: string) {
        return await this.createFolder({
            name: DEFAULT_FOLDER_NAME,
            userId,
        })
    }

    async createChromeExtensionFolder(userId: string) {
        return await this.createFolder({
            name: WORDS_FROM_CHROME_EXTENSION_FOLDER_NAME,
            userId,
        })
    }

    async getAllFoldersByUserId(userId: string) {
        const folders = await this.folderRepository.findAll({
            where: { userId },
            include: [
                {
                    model: Card,
                    attributes: [],
                },
            ],
            attributes: {
                include: [
                    [
                        Sequelize.fn('COUNT', Sequelize.col('cards.id')),
                        'cardsCount',
                    ],
                    [
                        Sequelize.fn('max', Sequelize.col('cards.updatedAt')),
                        'cardsUpdatedAt',
                    ],
                ],
            },
            group: ['Folder.id'],
        })

        return folders.map((f) => {
            const json = f.toJSON() as Folder & { cardsCount: string }
            return { ...json, cardsCount: +json.cardsCount }
        })
    }

    async updateFolder(folderId: string, updateFolderDto: UpdateFolderDto) {
        const folder = await this.folderRepository.findByPk(folderId)
        if (!folder) {
            throw new HttpException('Folder not found', HttpStatus.NOT_FOUND)
        }
        folder.name = updateFolderDto.name
        folder.parentId = updateFolderDto.parentId
        await folder.save()
        return folder
    }

    async deleteFolder(folderId: string) {
        return this.folderRepository.destroy({ where: { id: folderId } })
    }
}
