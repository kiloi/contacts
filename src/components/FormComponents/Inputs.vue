<template>
    <div class="mb-4">
        <label 
            class="block text-primary-gray sm:text-sm font-title mb-1 text-xs"
            :for="id">
            {{ label }} <span v-if="isRequired" class="text-primary-red">*</span>
        </label>
        <div class="relative">
            <input 
                class="border w-full py-2 rounded outline-none pl-9 font-title text-gray-500 text-xs sm:text-sm"
                :placeholder="label"
                :id="id"
                :type="type"
                :value="modelValue"
                :name="name"
                @input="$emit('update:modelValue', $event.target.value)"
            >
            <span   
                class="input-icon absolute left-2.5 top-2 text-gray-400 sm:text-base text-xs">
                <fa-icon :icon="icon"/>
            </span>
        </div>
        <slot name="error"></slot>
    </div>
</template>
<script>
    export default {
        props:{
            label: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            modelValue: {
                type: [String, Number],
                default: ''
            },
            id: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            isRequired: {
                type: Boolean
            }
        }
    }
</script>