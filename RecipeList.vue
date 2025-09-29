<template>
  <v-container>
    <h1 class="text-center ">Recipe List </h1>

    <v-row justify="center">
      <v-col xs="12" >
        <v-text-field v-model="search" label="Search by recipe name" variant="linethrough"/>
      </v-col>
    </v-row>

    <v-row class="my-2">
      <v-col xs="12" sm="6">
        <v-select
          v-model="category"
          :items="recipeStore.categories"
          label="Filter by Category"
          variant="solo"/>
      </v-col>
      <v-col xs="12" sm="6">
        <v-select
          v-model="sort"
          :items="[
            { title: 'Alphabetical', value: 'alphabetical' },
            { title: 'Preparation Time', value: 'prepTime' }
          ]"
          item-title="title"
          item-value="value"
          label="Sort by"
          variant="solo" />
      </v-col>
    </v-row>

     <v-row v-if="recipeStore.loading" justify="center" class="my-10">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="blue" size="64" />
        <p class="mt-4 text-h6 text-center">Loading recipes...</p>
      </v-col>
    </v-row>


    <v-row v-else>
      <v-col
        v-for="recipe in recipeStore.paginated"
        :key="recipe.id" xs="12" sm="6" md="4"
        class="d-flex" >
        <v-card
          class="flex-grow-1 d-flex flex-column"
          hover
          @click="navigateToRecipe(recipe.id)" >
          <v-img :src="recipe.image" height="200" cover :alt="recipe.title"></v-img>

          <v-card-title class="text-wrap">{{ recipe.title }}</v-card-title>
          <v-card-subtitle class="flex-grow-1" >{{ recipe.description }}</v-card-subtitle>
          <v-card-text class="pt-8">
            <v-chip color="red" variant="outlined">
              {{ recipe.prepTime }} min
            </v-chip>
            <v-chip  color="green" variant="outlined" class="ml-2">
              {{ recipe.category }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      v-if="!recipeStore.loading && recipeStore.filtered?.length > recipeStore.perPage"
      class="mt-8"
      justify="center">
      <v-col cols="auto">
        <v-pagination
          v-model="recipeStore.page"
          :length="recipeStore.totalPages"
          :total-visible="6"
          rounded="circle" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { onMounted } from 'vue';
import { useRecipeStore } from '../stores/recipes';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const recipeStore = useRecipeStore();
const { search, category, sort } = storeToRefs(recipeStore);

const router = useRouter();
const navigateToRecipe = (id) => {
  router.push({ name: 'RecipeDetails', params: { id: id.toString() } });
};

onMounted(() => {
  recipeStore.load();
});

</script>