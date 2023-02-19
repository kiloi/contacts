<template>
    <div class="h-screen bg-form-bg">
      <FormContainer  formTitle="Sign in to continue to our application" >
        <div class="mt-4">
            <Input
            id="email"
            type="email" 
            label="Email" 
            v-model="form.email" 
            icon="envelope" />
          <Input 
            id="password" 
            type="password" 
            label="Password" 
            v-model="form.password"
            icon="user-lock" />
          <Button 
            @btnClick="Login()"
            text="Sign In" />

          <p v-if="isError" class="mt-4 text-primary-red sm:text-sm font-title mb-1 text-xs">{{ errText }}</p>

          <p class="mt-4 text-primary-gray sm:text-sm font-title mb-1 text-xs">Don't have an account? 
            <router-link :to="{name: 'register'}">
              <span class="cursor-pointer text-primary-blue">Click Here</span>
            </router-link>
          </p>
        </div>  
      </FormContainer>
    </div>
</template>

<script>
  import FormContainer from '@/components/FormComponents/FormContainer.vue'
  import Input from '@/components/FormComponents/Inputs.vue'
  import Button from '@/components/Buttons.vue'
  import axios from 'axios'
  import { ref } from '@vue/reactivity'
  import { useRouter } from "vue-router";

  export default {
    components: { FormContainer, Input, Button },
    setup() {
    const form = ref({
      email : '',
      password : ''
    })
    const errText  = ref('')
    let isError = ref(false)
    const router = useRouter();

    const Login = async () => {
      try {
        const res = await axios.post('https://hive-test-api.onrender.com/api/v1/auth/login', form.value)
        sessionStorage.setItem('jwt', res.data.token);
        setTimeout(() => {
            router.push({ name: "profile", params: { id: res.data.userId } });
          }, 1000);
      } catch (error) {
        errText.value = error.response.data.msg
        isError.value = true
        setTimeout(() => {
          isError.value = false
        }, 3000);
      
      }
    };
    return { isError, errText, form, Login };
    },
  }
  
</script>

<style>


</style>
