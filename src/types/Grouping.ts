export type Grouping = {
    id: number,
    name: string,
    code: string,
    colour: string,
    text_colour: string,
    seats: number,
    previous_seats?: number,
    votes: number,
    vote_share: number
}

export function createGrouping(data: any): Grouping {
    return {
        id: data.id,
        name: data.name,
        code: data.code,
        colour: data.colour,
        text_colour: data.text_colour,
        seats: data.seats,
        previous_seats: data.previous_seats,
        votes: data.votes,
        vote_share: data.vote_share
    }
}