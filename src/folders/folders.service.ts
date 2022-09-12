import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Folder, FolderCreationAttrs } from './folder.model'
import { UpdateFolderDto } from './dto/UpdateFolderDto'

@Injectable()
export class FoldersService {
    constructor(@InjectModel(Folder) private folderRepository: typeof Folder) {}

    async createFolder(folderCreationAttrs: FolderCreationAttrs) {
        const folder = await this.folderRepository.create(folderCreationAttrs)
        return folder
    }

    async getAllFoldersByUserId(userId: number) {
        const folders = await this.folderRepository.findAll({
            where: { userId },
        })
        return folders
    }

    async updateFolder(folderId: number, updateFolderDto: UpdateFolderDto) {
        const folder = await this.folderRepository.findByPk(folderId)
        if (!folder) {
            throw new HttpException('Folder not found', HttpStatus.NOT_FOUND)
        }
        folder.name = updateFolderDto.name
        folder.parentId = updateFolderDto.parentId
        await folder.save()
        return folder
    }

    async deleteFolder(folderId: number) {
        return this.folderRepository.destroy({ where: { id: folderId } })
    }
}
