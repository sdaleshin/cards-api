import {
    Definition,
    DefinitionMeta,
    PointerSymbol,
    ShortSynsetType,
    SynsetType,
} from '../wordnet.type'
import { ApiProperty } from '@nestjs/swagger'

class DefinitionMetaDto implements DefinitionMeta {
    @ApiProperty()
    lexFilenum: number
    @ApiProperty()
    pointerCount: number
    @ApiProperty()
    pointers: {
        pointerSymbol: PointerSymbol
        synsetOffset: number
        pos: ShortSynsetType
        sourceTargetHex: string
        data: Definition
    }[]
    @ApiProperty()
    synsetOffset: number
    @ApiProperty()
    synsetType: SynsetType
    @ApiProperty()
    wordCount: number
    @ApiProperty()
    words: { word: string; lexId: number }[]
}

export class DefinitionDto implements Definition {
    @ApiProperty()
    glossary: string
    @ApiProperty({ type: DefinitionMetaDto })
    meta: DefinitionMetaDto
}
