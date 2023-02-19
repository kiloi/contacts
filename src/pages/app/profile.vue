<template>
    <div class="h-screen">
       <section class="shadow-md rounded p-8 mt-20 bg-white w-1/2 mx-auto relative">
            <ul class="relative flex">
                <li class="w-28 h-28 rounded-full bg-slate-400 text-center -mt-16 mr-6 flex items-center justify-center">
                    <p v-if="profileImage == null" class="text-4xl text-white capitalize">{{userFname.charAt(0)}} {{userLname.charAt(0)}}</p>
                    <img :src="profileImage" alt="" class="w-28 h-28 rounded-full" v-if="profileImage != null">
                </li>
                <li class="absolute bottom-0 left-28">
                    <label for="imageUpload" class="text-primary-blue cursor-pointer">
                        <fa-icon icon="camera-retro"/> 
                    </label>
                    <input  @change="uploadProfile($event)" capture class="hidden" type="file" accept="image/jpeg, image/png, image/jpg" id="imageUpload" name="imageUpload">
                </li>
                <li class="text-primary-gray font-title mb-1 capitalize">{{ userFname }} {{ userLname }}</li>
                
            </ul>
            <p 
                class="absolute right-4 -top-3 h-10 w-10 rounded-full bg-primary-blue flex items-center justify-center cursor-pointer"
                @click="showModal()"
            >
            <span   
                class="input-icon absolute left-3 top-2 text-white sm:text-base text-xs">
                <fa-icon icon="edit"/>
            </span>
            </p>
       </section>
            <ModalForm formName = "Update Your Info" v-if="isShowModal">
                <Input
                    
                    id="fname"
                    type="text" 
                    label="First Name" 
                    v-model="form.firstname" 
                    icon="envelope" />
                <Input 
                    id="lname" 
                    type="lname" 
                    label="Last Name" 
                    v-model="form.lastname"
                    icon="user-lock" />
                <div class="w-full text-right flex justify-end">
                    <div class="w-1/2 flex space-x-4">
                        <Button 
                            @btnClick="isShowModal = false"
                            text="Cancel" />
                        <Button 
                            @btnClick="updateUser()"
                            text="Update" />
                    </div>
                </div>
                
            </ModalForm>
    </div>
</template>

<script>
import ModalForm from '@/components/FormComponents/ModalFormContainer.vue'
import Input from '@/components/FormComponents/Inputs.vue'
import Button from '@/components/Buttons.vue'
import { ref  } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router';

export default {
    components: { ModalForm, Input, Button},
    setup(){
        const token =  sessionStorage.getItem('jwt');
        const AuthStr = 'Bearer '.concat(token);
        let isShowModal = ref(false)
        const userFname = ref('')
        const userLname = ref('')
        const initialName = ref('')
        const route = useRoute()
        const form = ref({
            firstname : '',
            lastname: ''
        })
        const profileImage = ref(null)

        const getUserDetails = async () => {
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ route.params.id, { headers: { Authorization: AuthStr } })
                userFname.value = res.data.firstname
                userLname.value =res.data.lastname
                initialName.value = userFname.value.charAt(0)
            } catch (error) {
                console.log(error);
            }
        }
        getUserDetails();


        const showModal = () => {
            isShowModal.value = true
            form.value.firstname =  userFname.value
            form.value.lastname =  userLname.value
        }


        const updateUser = async () => {
            try {
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+ route.params.id, form.value , { headers: { Authorization: AuthStr } })
                userFname.value = res.data.firstname
                userLname.value =res.data.lastname
                setTimeout(() => {
                    isShowModal.value = false
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }

        const uploadProfile =  (e) => {
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                profileImage.value = e.target.result;
            };
        }

        return {
            userFname,
            userLname,
            isShowModal,
            initialName,
            form,
            updateUser,
            showModal,
            uploadProfile,
            profileImage
        }
    },
}
</script>