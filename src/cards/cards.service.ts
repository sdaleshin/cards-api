import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Card, CardCreationAttrs } from './card.model'
import { UpdateCardDto } from './dto/UpdateCardDto'

@Injectable()
export class CardsService {
    constructor(@InjectModel(Card) private cardRepository: typeof Card) {}

    async create(cardCreationAttrs: CardCreationAttrs) {
        const card = await this.cardRepository.create(cardCreationAttrs)
        return card
    }

    async getCardsByFolderId(folderId: number) {
        const cards = await this.cardRepository.findAll({
            where: { folderId },
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
        card.folderId = updateCardDto.folderId
        await card.save()
        return card
    }

    async deleteCard(cardId: number) {
        return this.cardRepository.destroy({ where: { id: cardId } })
    }
}
