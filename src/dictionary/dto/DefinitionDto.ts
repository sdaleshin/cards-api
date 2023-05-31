import { Definition, DefinitionPointer } from '../wordnet.type'
import { ApiProperty } from '@nestjs/swagger'

class DefinitionPointerDto implements DefinitionPointer {
    @ApiProperty()
    pointerSymbol: string
    @ApiProperty()
    pos: string
    @ApiProperty()
    sourceTarget: string
    @ApiProperty()
    synsetOffset: number
}

export class DefinitionDto implements Definition {
    @ApiProperty()
    word: string
    @ApiProperty()
    def: string
    @ApiProperty()
    exp: string[]
    @ApiProperty()
    gloss: string
    @ApiProperty()
    lemma: string
    @ApiProperty()
    lexFilenum: number
    @ApiProperty()
    lexId: string
    @ApiProperty()
    pos: string
    @ApiProperty()
    ptrs: DefinitionPointerDto[]
    @ApiProperty()
    synonyms: string[]
    @ApiProperty()
    synsetOffset: number
    @ApiProperty()
    wCnt: number
}
