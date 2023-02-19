<template>
    <div class="h-screen bg-form-bg">
      <FormContainer 
          formTitle="Register Now!" 
      >
        <div class="mt-4">
            <div class="flex space-x-3">
                <div class="w-1/2">
                    <Input
                    id="fname"
                    type="text" 
                    label="First Name" 
                    v-model="form.firstname" 
                    icon="envelope" />
                </div>
                <div class="w-1/2">
                    <Input
                    id="lname"
                    type="text" 
                    label="Last Name" 
                    v-model="form.lastname" 
                    icon="envelope" />
                </div>
            </div>
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
            <Input 
                id="cpassword" 
                type="password" 
                label="Confirm Password" 
                v-model="cpassword"
                icon="user-lock" />
            <Button 
                @btnClick="Register()"
                text="Create Account" />


            <p v-if="isError" class="mt-4 text-primary-red sm:text-sm font-title mb-1 text-xs">{{ errText }}</p>
            <p v-if="isSuccess" class="mt-4 text-primary-green sm:text-sm font-title mb-1 text-xs">You are now registered!</p>

            <p class="mt-4 text-primary-gray sm:text-sm font-title mb-1 text-xs">Already have an account? 
                <router-link :to="{name: 'login'}">
                    <span class="cursor-pointer text-primary-blue" @click="register()">Login Here</span>
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
  setup(){
    const form = ref({
        firstname: '',
        lastname: '',
        email : '',
        password : ''
    })
    const cpassword = ref('')
    const errText  = ref('')
    let isError = ref(false)
    let isSuccess = ref(false)
    const router = useRouter();

    const Register = async () => {
        if (cpassword.value != '' && form.value.password != '') {
            if (cpassword.value == form.value.password ) {
                try {
                    const res = await axios.post('https://hive-test-api.onrender.com/api/v1/auth/register', form.value)
                    console.log(res);
                    form.value.firstname = ''
                    form.value.lastname = ''
                    form.value.email = ''
                    form.value.password = ''
                    isSuccess.value = true
                    cpassword.value = ''
                    setTimeout(() => {
                        isSuccess.value = false
                    }, 3000);
                    setTimeout(() => {
                        router.push({ name: "login"} );
                    }, 5000);
                } catch (error) {
                    errText.value = 'Please Provide All Details'
                    isError.value = true
                    setTimeout(() => {
                    isError.value = false
                    }, 3000);
                }
            } else {
                errText.value = 'Password dont match'
                isError.value = true
                setTimeout(() => {
                    isError.value = false
                }, 3000);
            }
        } else {
            errText.value = 'Please Provide All Details'
            isError.value = true
            setTimeout(() => {
                isError.value = false
            }, 3000);
        }

    };
    return { isError, errText, cpassword, form, Register, isSuccess };
  }
}
</script>

<style>

</style>
