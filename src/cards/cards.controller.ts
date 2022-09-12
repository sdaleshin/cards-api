import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CardsService } from './cards.service'
import { CreateCardDto } from './dto/CreateCardDto'
import { Card } from './card.model'
import { UpdateCardDto } from './dto/UpdateCardDto'

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @ApiOperation({ summary: 'Create card' })
    @ApiResponse({ status: 200, type: Card })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.create(createCardDto)
    }

    @ApiOperation({ summary: 'Get cards by folder id' })
    @ApiResponse({ status: 200, type: [Card] })
    @UseGuards(JwtAuthGuard)
    @Get('/by-folder/:folderId')
    getByFolderId(@Param('folderId') folderId: number) {
        return this.cardsService.getCardsByFolderId(folderId)
    }

    @ApiOperation({ summary: 'Update card' })
    @ApiResponse({ status: 200, type: Card })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.updateCard(id, updateCardDto)
    }

    @ApiOperation({ summary: 'Delete card' })
    @ApiResponse({ status: 200, type: Number })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.cardsService.deleteCard(id)
    }
}
