// Move the /api folder into /src/routes to test.

import data from "../data"
import { json } from '@sveltejs/kit'

export const GET = () => {
    return json(data)
}