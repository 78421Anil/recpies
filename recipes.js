import { defineStore } from 'pinia'
import recipesData from '../data/recipes.json'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [],
    loading: false,
    error: null,
    search: '',
    category: 'all',
    sort: 'alphabetical',
    page: 1,
    perPage: 6,
  }),

  getters: {
    categories: (state) => ['all', ...new Set(state.recipes.map(r => r.category))],

    filtered: (state) => {
      let list = [...state.recipes]

      if (state.search) {
        list = list.filter(r =>
          r.title.toLowerCase().includes(state.search.toLowerCase())
        )
      }

      if (state.category !== 'all') {
        list = list.filter(r => r.category === state.category)
      }

      if (state.sort === 'alphabetical') {
        list.sort((a, b) => a.title.localeCompare(b.title))
      } else if (state.sort === 'prepTime') {
        list.sort((a, b) => a.prepTime - b.prepTime)
      }

      return list
    },

    paginated: (state) => {
      const start = (state.page - 1) * state.perPage
      return state.filtered.slice(start, start + state.perPage)
    },

    totalPages: (state) => Math.ceil(state.filtered.length / state.perPage),

    byId: (state) => (id) => state.recipes.find(r => r.id === +id),
  },

  actions: {
    async load() {
      this.loading = true
      this.error = null
      try {
        await new Promise(res => setTimeout(res, 1000))
        this.recipes = recipesData
      } catch {
        this.error = 'Could not load recipes'
      } finally {
        this.loading = false
      }
    },

  }
})