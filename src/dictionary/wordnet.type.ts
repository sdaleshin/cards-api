export type Definition = {
    synsetOffset: number
    lexFilenum: number
    pos: string
    wCnt: number
    lemma: string
    synonyms: string[]
    lexId: string
    ptrs: DefinitionPointer[]
    gloss: string
    def: string
    exp: string[]
}

export type DefinitionPointer = {
    pointerSymbol: string
    synsetOffset: number
    pos: string
    sourceTarget: string
}
