export type SynsetType =
    | 'noun'
    | 'verb'
    | 'adjective'
    | 'adjective satellite'
    | 'adverb'
export type ShortSynsetType = 'n' | 'v' | 'a' | 's' | 'r'

/**
 * !    Antonym
 * @    Hypernym
 * @i    Instance Hypernym
 * ~    Hyponym
 * ~i    Instance Hyponym
 * #m    Member holonym
 * #s    Substance holonym
 * #p    Part holonym
 * %m    Member meronym
 * %s    Substance meronym
 * %p    Part meronym
 * =    Attribute
 * +    Derivationally related form
 * ;c    Domain of synset - TOPIC
 * -c    Member of this domain - TOPIC
 * ;r    Domain of synset - REGION
 * -r    Member of this domain - REGION
 * ;u    Domain of synset - USAGE
 * -u    Member of this domain - USAGE
 */
export type NounPointerSymbol =
    | '!'
    | '@'
    | '@i'
    | '~'
    | '~i'
    | '#m'
    | '#s'
    | '#p'
    | '%m'
    | '%s'
    | '%p'
    | '='
    | '+'
    | ';c'
    | '-c'
    | ';r'
    | '-r'
    | ';u'
    | '-u'

/**
 * !    Antonym
 * @    Hypernym
 *  ~    Hyponym
 * *    Entailment
 * >    Cause
 * ^    Also see
 * $    Verb Group
 * +    Derivationally related form
 * ;c    Domain of synset - TOPIC
 * ;r    Domain of synset - REGION
 * ;u    Domain of synset - USAGE
 */
export type VerbPointerSymbol =
    | '!'
    | '@'
    | '~'
    | '*'
    | '>'
    | '^'
    | '$'
    | '+'
    | ';c'
    | ';r'
    | ';u'

/**
 * !    Antonym
 * &    Similar to
 * <    Participle of verb
 * \    Pertainym (pertains to noun)
 * =    Attribute
 * ^    Also see
 * ;c    Domain of synset - TOPIC
 * ;r    Domain of synset - REGION
 * ;u    Domain of synset - USAGE
 */
export type AdjectivePointerSymbol =
    | '!'
    | '&'
    | '<'
    | '\\'
    | '='
    | '^'
    | ';c'
    | ';r'
    | ';u'

/**
 * !    Antonym
 * \    Derived from adjective
 * ;c    Domain of synset - TOPIC
 * ;r    Domain of synset - REGION
 * ;u    Domain of synset - USAGE
 */
export type AdverbPointerSymbol = '!' | '/' | ';r' | ';r' | ';u'

export type PointerSymbol =
    | NounPointerSymbol
    | VerbPointerSymbol
    | AdverbPointerSymbol
    | AdjectivePointerSymbol

export type DefinitionMeta = {
    synsetOffset: number
    lexFilenum: number
    synsetType: SynsetType
    wordCount: number
    words: { word: string; lexId: number }[]
    pointerCount: number
    pointers: {
        pointerSymbol: PointerSymbol
        synsetOffset: number
        /** Part of speech */
        pos: ShortSynsetType
        sourceTargetHex: string
        data: Definition
    }[]
}

export type Definition = {
    meta: DefinitionMeta
    glossary: string
}
