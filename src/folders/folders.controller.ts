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
import { FoldersService } from './folders.service'
import { Folder } from './folder.model'
import { CreateFolderDto } from './dto/CreateFolderDto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { JwtTokenPayload } from '../auth/auth.type'
import { UpdateFolderDto } from './dto/UpdateFolderDto'
import { FolderDto } from './dto/FolderDto'

interface Request {
    user: JwtTokenPayload
}

@ApiTags('Folders')
@Controller('folders')
export class FoldersController {
    constructor(private foldersService: FoldersService) {}

    @ApiOperation({ summary: 'Create folder' })
    @ApiResponse({ status: 200, type: Folder })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createFolderDto: CreateFolderDto, @Req() request: Request) {
        return this.foldersService.createFolder({
            ...createFolderDto,
            userId: request.user.id,
        })
    }

    @ApiOperation({ summary: 'Get all folders' })
    @ApiResponse({ status: 200, type: [FolderDto] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Req() request: Request) {
        return this.foldersService.getAllFoldersByUserId(
            request.user.id,
        ) as unknown as FolderDto
    }

    @ApiOperation({ summary: 'Update folder' })
    @ApiResponse({ status: 200, type: [Folder] })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
        return this.foldersService.updateFolder(id, updateFolderDto)
    }

    @ApiOperation({ summary: 'Delete folder' })
    @ApiResponse({ status: 200, type: Number })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.foldersService.deleteFolder(id)
    }
}
