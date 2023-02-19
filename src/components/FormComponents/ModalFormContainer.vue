<template>
    <div  class="bg-black bg-opacity-50 left-0 top-0 right-0 fixed h-screen">
        <div class="px-2 flex justify-center">
             <div class="shadow-md rounded-lg bg-white px-4 pb-4 pt-3 w-full md:w-3/4 xl:w-1/2 2xl:w-2/5 mt-44 lg:mt-32">
                <form @submit.prevent>
                    <div class="flex items-center mb-4">
                        <h1 class="font-title text-sm sm:text-lg text-theme-text-color font-medium text-theme-color">{{formName}}</h1>
                    </div>
                    <slot></slot>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            formName: {
                type: String,
                default: ''
             }
        }
    }
</script>