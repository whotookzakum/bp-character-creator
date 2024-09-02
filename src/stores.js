import { writable } from 'svelte/store'
import defaultCategories from "./data/categories.json"
import { browser } from '$app/environment'

const cachedCategories = browser && localStorage.getItem("categories")
export const categories = writable(cachedCategories ? JSON.parse(cachedCategories) : defaultCategories)

const cachedCategoryIndex = browser && localStorage.getItem("categoryIndex")
export const categoryIndex = writable(cachedCategoryIndex ? parseInt(cachedCategoryIndex) : 0)
categoryIndex.subscribe((value) => browser && localStorage.setItem("categoryIndex", value.toString()))

const cachedGender = browser && localStorage.getItem("gender")
export const gender = writable(cachedGender ? parseInt(cachedGender) : 0)
gender.subscribe((value) => browser && localStorage.setItem("gender", value.toString()))

const cachedQuery = browser && localStorage.getItem("query")
export const query = writable(cachedQuery ? cachedQuery : "")
query.subscribe((value) => browser && localStorage.setItem("query", value))