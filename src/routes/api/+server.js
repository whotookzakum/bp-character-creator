import data from "../../data"
import { json } from '@sveltejs/kit'

export const GET = () => {
    return json(data)
}