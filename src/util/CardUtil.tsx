type Ability = {
    name: string
}

type PokemonV2Ability = {
    pokemon_v2_ability: Ability
}

type CardUtil = {
    id: number,
    name: string,
    weight: number,
    height: number,
    base_experience: number,
    pokemon_v2_pokemonabilities: Array<PokemonV2Ability>
}

export default CardUtil;