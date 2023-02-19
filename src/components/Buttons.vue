<template>
    <button 
        class="base-btn bg-primary-green  w-full" 
        @click="$emit('btnClick', $event)">
        {{text}}
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        toggleBtn:{
            type: Boolean
        }
    },
    emits: ['btnClick'],
}
</script>