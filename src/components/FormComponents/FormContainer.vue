<template>
  <div class="flex justify-center px-4">
      <div class=" shadow-md rounded-lg bg-white mt-20">
        <div class="px-10 pb-8 block">
          <form @submit.prevent class="mt-4">
            <h1 class="font-title mb-3 text-sm md:text-lg">{{ formTitle }}</h1>
            <slot></slot>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    props: { 
        formTitle: {
            type : String,
            default: ''
        }
     }
  }
</script>