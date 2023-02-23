import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CardsService } from './cards.service'
import { CreateCardDto } from './dto/CreateCardDto'
import { Card } from './card.model'
import { UpdateCardDto } from './dto/UpdateCardDto'
import { JwtTokenPayload } from '../auth/auth.type'

interface Request {
    user: JwtTokenPayload
}

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

    @ApiOperation({ summary: 'Get all cards for use' })
    @ApiResponse({ status: 200, type: [Card] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() request: Request) {
        return this.cardsService.getAllCardsByUserId(request.user.id)
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
