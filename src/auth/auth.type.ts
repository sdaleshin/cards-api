export type JwtTokenPayload = {
    id: number
    email: string
    name: string
}

export type GoogleJwtType = {
    iss: string
    nbf: number
    aud: string
    sub: string
    email: string
    email_verified: boolean
    azp: string
    name: string
    picture: string
    given_name: string
    family_name: string
    iat: number
    exp: number
    jti: string
}
