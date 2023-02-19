<template>
    <div class="h-screen">
        <div class="grid grid-cols-5 gap-4" >
            <ul v-for="user in userArrCopy" :key="user._id">
                <li class="shadow-md rounded-md pb-14 mt-20 bg-white text-center relative">
                    <div class="relative flex w-100% justify-center -mt-10">
                        <div class="w-20 h-20 rounded-full bg-slate-400 text-center  flex items-center justify-center">
                            <p v-if="profileImage == null" class="text-lg text-white capitalize">{{ user.firstname.charAt(0) }} {{ user.lastname.charAt(0) }}</p>
                            <img :src="profileImage" alt="" class="w-20 h-20 rounded-full" v-if="profileImage != null">
                         </div>
                        <div class="absolute bottom-0 left-44 mt-4">
                            <label for="imageUpload" class="text-primary-blue cursor-pointer">
                                <fa-icon icon="camera-retro"/> 
                            </label>
                            <input  @change="uploadProfile($event)" capture class="hidden" type="file" accept="image/jpeg, image/png, image/jpg" id="imageUpload" name="imageUpload">
                        </div>
                    </div>
                    <p class="mt-4 text-primary-gray font-title capitalize"> {{ user.firstname }} {{ user.lastname }} - <span class="text-primary-blue"> {{ user.role }}</span> </p>
                <div class="flex space-x-4 absolute -bottom-4 left-4">
                    <p 
                        class=" h-10 w-10 rounded-full bg-primary-blue flex items-center justify-center cursor-pointer"
                        @click="openEditModal(user._id)"
                    >
                    <span   
                        class="input-icon absolute left-3 top-2 text-white sm:text-base text-xs">
                        <fa-icon icon="edit"/>
                    </span>
                    </p>
                    <p 
                        class="relative h-10 w-10 rounded-full bg-primary-red flex items-center justify-center cursor-pointer"
                        @click="deleteUser(user._id)"
                    >
                    <span   
                        class="input-icon absolute left-3 top-2 text-white sm:text-base text-xs">
                        <fa-icon icon="trash-alt"/>
                    </span>
                    </p>
                </div>
            </li>
        </ul>
           
        </div>
        <ModalForm formName = "Update Your Info" v-if="isShowModal">
            <p>{{ userId }}</p>
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
                <div class=" pr-6 border w-full py-2 rounded outline-none pl-9 font-title text-gray-500 text-xs sm:text-sm">
                    <select class="w-full" v-model="form.role">
                        <option v-for="(role, index) in roles" :key="index">{{role}}</option>
                    </select>
                </div>
                
                <div class="w-full text-right flex justify-end mt-10">
                    <div class="w-1/2 flex space-x-4">
                        <Button 
                            @btnClick="isShowModal = false"
                            text="Cancel" />
                        <Button 
                            @btnClick="editUser()"
                            text="Update" />
                    </div>
                </div>
        </ModalForm>
    </div>
</template>


<script>
import { ref } from 'vue';
import axios from 'axios'
// Components
import ModalForm from '@/components/FormComponents/ModalFormContainer.vue'
import Input from '@/components/FormComponents/Inputs.vue'
import Button from '@/components/Buttons.vue'

export default {
    components: { ModalForm, Input, Button},
    setup() {
        const token =  sessionStorage.getItem('jwt');
        const AuthStr = 'Bearer '.concat(token);
        const users = ref([])
        let isShowModal = ref(false)
        const userArr = ref([])
        const userArrCopy = ref([])
        const userId = ref()
        const form = ref({
            firstname : '',
            lastname: '',
            role : ''
        })
        const roles = ref(['Admin', 'Supervisor', 'User'])
        const profileImage = ref(null)

        const getUsers = async () => {
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/AllUsers', { headers: { Authorization: AuthStr } })
                userArr.value = res.data
                userArrCopy.value = userArr.value.filter(item => item.role != 'root')
            } catch (error) {
                console.log(error);
            }
        }
        getUsers();

        const openEditModal = async (id) => {
            isShowModal.value = true
            userId.value = id
            console.log( userId.value);
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ id, { headers: { Authorization: AuthStr } })
                form.value.firstname = res.data.firstname
                form.value.lastname = res.data.lastname
                form.value.role = res.data.role
            } catch (error) {
                console.log(error);
            }
        }

        const editUser = async () => {
            try {
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+ userId.value, form.value , { headers: { Authorization: AuthStr } })
                console.log(res);
                getUsers();
                setTimeout(() => {
                    isShowModal.value = false
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }

        const deleteUser = async (id) => {
            try {
                const res = await axios.delete('https://hive-test-api.onrender.com/api/v1/users/' + id, { headers: { Authorization: AuthStr } })
                console.log(res);
                getUsers();
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
            users,
            getUsers,
            isShowModal,
            form,
            userArrCopy,
            deleteUser,
            openEditModal,
            editUser,
            profileImage,
            uploadProfile,
            roles
        }
    }
}
</script>