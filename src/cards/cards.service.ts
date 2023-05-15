import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Card, CardCreationAttrs } from './card.model'
import { UpdateCardDto } from './dto/UpdateCardDto'
import { Folder } from '../folders/folder.model'
import { MerkleJson } from 'merkle-json'
import { CreateCardDto } from './dto/CreateCardDto'

const mj = new MerkleJson()

const getHash = (obj) => {
    return mj.hash(obj)
}

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

    async create(cardCreationDto: CreateCardDto) {
        const hash = getHash(cardCreationDto)
        const cardFoundByHash = await this.cardRepository.findOne({
            where: {
                hash,
            },
        })
        if (cardFoundByHash) {
            return cardFoundByHash
        } else {
            return await this.cardRepository.create({
                ...cardCreationDto,
                hash,
            })
        }
    }

    async getCardsByFolderId(folderId: number) {
        const cards = await this.cardRepository.findAll({
            where: { folderId },
        })
        return cards
    }

    async getAllCardsByUserId(userId: number) {
        const cards = await this.cardRepository.findAll({
            include: [
                {
                    model: Folder,
                    where: { userId },
                },
            ],
        })
        return cards
    }

    async updateCard(cardId: number, updateCardDto: UpdateCardDto) {
        const card = await this.cardRepository.findByPk(cardId)
        if (!card) {
            throw new HttpException('Card not found', HttpStatus.NOT_FOUND)
        }
        card.title = updateCardDto.title
        card.explanation = updateCardDto.explanation
        card.type = updateCardDto.type
        card.folderId = updateCardDto.folderId
        card.hash = getHash(updateCardDto)
        await card.save()
        return card
    }

    async deleteCard(cardId: number) {
        return this.cardRepository.destroy({ where: { id: cardId } })
    }
}
