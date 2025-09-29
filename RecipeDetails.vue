<template>
  <v-container>
    <div v-if="recipeStore.loading" class="text-center mt-10">
      <p>Loading recipe......</p>
    </div>

    <div v-else-if="recipe">
      <v-card class="pa-4">
        <v-img :src="recipe.image" height="400"  cover></v-img>
      <v-card-title style="white-space: normal; word-wrap: break-word;">
          {{ recipe.title }}
        </v-card-title>
       <v-card-subtitle style="white-space: normal; word-wrap: break-word;">
           {{ recipe.description }}
        </v-card-subtitle>

        <v-card-text>
          <h3>Ingredients</h3>
          <v-list >
            <v-list-item v-for="(ing, i) in recipe.ingredients" :key="i">
              {{ ing }}
            </v-list-item>
          </v-list>

          <h3 class="mt-4">Instructions</h3>
          <v-list >
            <v-list-item v-for="(ing, i) in recipe.instructions" :key="i">
              {{ ing }}
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </div>

    <div v-else class="text-center mt-10">
      <p>Recipe not found 😔</p>
    </div>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipes'

const route = useRoute()
const recipeStore = useRecipeStore()


onMounted(async () => {
  if (!recipeStore.recipes.length) {
    await recipeStore.load()
  }
})

const recipe = computed(() => recipeStore.byId(route.params.id))

</script>
