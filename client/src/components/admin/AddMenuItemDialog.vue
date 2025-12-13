<template>
  <div>
    <!-- Open Dialog Button -->
    <button
      class="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-xl
             hover:bg-indigo-700 transition-colors shadow-md"
      @click="dialog?.showModal()"
    >
      <Plus class="w-4 h-4" />
      <span class="ml-2">Add Item</span>
    </button>

    <!-- Dialog -->
    <dialog
      ref="dialog"
      class="top-[50%] left-[50%] p-6 rounded-xl w-[500px] bg-white
             backdrop:bg-black/50 backdrop:backdrop-blur-sm
             transform -translate-x-1/2 -translate-y-1/2 shadow-xl"
    >
      <h2 class="text-xl font-semibold mb-4 text-slate-800">Create Menu Item</h2>

      <!-- FORM -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Title -->
        <Input
          v-model="form.title"
          type="text"
          label="Title"
          placeholder="Item Title"
          required
        />

        <!-- Description -->
        <TextareaComponent
          v-model="form.description"
          label="Description"
          placeholder="Item Description"
          required
        />

        <!-- Price + Discount -->
        <div class="grid grid-cols-2 gap-4">
          <Input
            v-model.number="form.price"
            type="number"
            step="0.01"
            label="Price"
            placeholder="Item Price"
            required
          />


            <Input
              v-model.number="form.discountPrice"
              type="number"
              step="0.01"
              label="Discount Price"
              placeholder="Optional" />
          </div>

        <!-- Category -->
        <SelectComponent
          v-model="form.category"
          label="Category"
          required
        >
          <option disabled value="">Select Category</option>
          <option>Appetizers</option>
          <option>Main Courses</option>
          <option>Desserts</option>
          <option>Beverages</option>
        </SelectComponent>

        <!-- Image URL -->
        <!-- <div>
          <label class="block font-medium text-slate-700">Image URL</label>
          <input
            v-model="form.image"
            type="text"
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2
                   focus:ring-indigo-600 outline-none"
            required
          />
        </div> -->

        <!-- Ingredients -->
        <!-- <div>
          <label class="block font-medium text-slate-700">Ingredients</label>
          <input
            v-model="ingredientInput"
            @keyup.enter.prevent="addIngredient"
            type="text"
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2
                   focus:ring-indigo-600 outline-none"
            placeholder="Press Enter to add"
          />

          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="(ing, idx) in form.ingredients"
              :key="idx"
              class="px-3 py-1 bg-slate-200 rounded-full flex items-center gap-2 text-sm"
            >
              {{ ing }}
              <button
                type="button"
                class="text-red-500 hover:text-red-700"
                @click="removeIngredient(idx)"
              >
                ×
              </button>
            </span>
          </div>
        </div> -->

        <!-- Dietary Info -->
        <!-- <div>
          <label class="block font-medium text-slate-700">Dietary Info</label>
          <select
            v-model="form.dietaryInfo"
            class="w-full mt-1 p-2 border rounded-lg focus:ring-2
                   focus:ring-indigo-600 outline-none"
            multiple
          >
            <option>Vegan</option>
            <option>Vegetarian</option>
            <option>Gluten-Free</option>
            <option>Spicy</option>
            <option>Contains Nuts</option>
            <option>Halal</option>
          </select>
        </div> -->

        <!-- Availability -->
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="form.isAvailable" />
          <label class="font-medium text-slate-700">Available</label>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            @click="closeDialog"
            class="px-4 py-2 rounded-lg border border-slate-300
                   hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg
                   hover:bg-indigo-700 shadow-md transition"
          >
            Save Item
          </button>
        </div>

      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "./InputComponent.vue";
import { Plus } from "lucide-vue-next";
import  TextareaComponent from "./TextareaComponent.vue";
import  SelectComponent from "./SelectComponent.vue";

const dialog = ref<HTMLDialogElement | null>(null);

// FORM STATE
const form = ref({
  title: "",
  description: "",
  price: 0,
  discountPrice: null,
  category: "",
  image: "",
  ingredients: [] as string[],
  dietaryInfo: [] as string[],
  isAvailable: true,
});

// INGREDIENT INPUT
const ingredientInput = ref("");

const addIngredient = () => {
  const val = ingredientInput.value.trim();
  if (!val) return;
  form.value.ingredients.push(val);
  ingredientInput.value = "";
};

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1);
};

// CLOSE
const closeDialog = () => dialog.value?.close();

// SUBMIT
const submitForm = () => {
  console.log("Submitted:", form.value);
  dialog.value?.close();
};
</script>
