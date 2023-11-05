import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Card } from './card.model'
import { UpdateCardDto } from './dto/UpdateCardDto'
import { Folder } from '../folders/folder.model'
import { CreateCardDto } from './dto/CreateCardDto'
import { FoldersService } from '../folders/folders.service'

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

    async create(cardCreationDto: CreateCardDto) {
        const cardFoundByHash = await this.cardRepository.findOne({
            where: {
                hash: cardCreationDto.hash,
                folderId: cardCreationDto.folderId,
            },
        })
        if (cardFoundByHash) {
            return cardFoundByHash
        } else {
            return await this.cardRepository.create({
                ...cardCreationDto,
            })
        }
    }

    async getCardsByFolderId(folderId: string) {
        return await this.cardRepository.findAll({
            where: { folderId },
        })
    }

    async getAllCardsByUserId(userId: string) {
        return await this.cardRepository.findAll({
            include: [
                {
                    model: Folder,
                    where: { userId },
                },
            ],
        })
    }

    async updateCard(cardId: string, updateCardDto: UpdateCardDto) {
        const card = await this.cardRepository.findByPk(cardId)
        if (!card) {
            throw new HttpException('Card not found', HttpStatus.NOT_FOUND)
        }
        card.title = updateCardDto.title
        card.explanation = updateCardDto.explanation
        card.type = updateCardDto.type
        card.folderId = updateCardDto.folderId
        card.hash = updateCardDto.hash
        await card.save()
        return card
    }

    async deleteCard(cardId: string) {
        return this.cardRepository.destroy({ where: { id: cardId } })
    }
}
