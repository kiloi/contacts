<template>
    <div class="w-full h-screen overflow-y-hidden">
        <nav class="bg-white border-gray-500 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Welcome User</span>
                <div class="hidden w-full md:block md:w-auto">
                    <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-400 hover:text-white  md:p-0">
                            <router-link :to="{name:'profile' , params: { id: userId } }">
                                Profile
                            </router-link>
                        </li>
                        <li  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-400 hover:text-white md:p-0">
                            <router-link :to="{name:'contacts',  params: { id: userId }}">Contacts</router-link>
                        </li>
                        <li v-if="userRole == 'root'"  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-400 hover:text-white md:p-0">
                            <router-link :to="{name:'manage-users'}">Manage Users</router-link>
                        </li>
                        <li  class="cursor-pointer block py-2 pl-3 pr-4 text-gray-400 hover:text-white md:p-0">
                            <router-link :to="{name:'login'}">Logout</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="px-12 sm:px-4 py-2.5 bg-body-bg">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { ref  } from 'vue'
import axios from 'axios'
    export default {
        setup(){
            const token =  sessionStorage.getItem('jwt');
            const AuthStr = 'Bearer '.concat(token);
            const route = useRoute()
            const userId = ref(route.params.id)
            const userRole = ref('')

            const getUserDetails = async () => {
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ route.params.id, { headers: { Authorization: AuthStr } })
                userRole.value = res.data.role
            } catch (error) {
                console.log(error);
            }
        }
        getUserDetails();


            return{
                userId,
                userRole
            }
        }
    }
</script>