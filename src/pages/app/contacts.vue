<template>
    <div class="h-screen grid grid-cols-2 gap-4">
       <div class="shadow-md rounded-md  mt-10 bg-white" style="height: 500px;">
            <ul class="bg-slate-100 mb-4 p-4" v-for="contact in contacts" :key="contact._id">
                <li class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 rounded-full bg-slate-400 flex justify-center items-center">
                            <p class="text-lg text-white capitalize">{{ contact.firstname.charAt(0) }} {{ contact.lastname.charAt(0) }}</p>
                        </div>
                        <p class=" text-primary-gray font-title capitalize"> {{ contact.firstname }} {{ contact.lastname }}</p>
                    </div>
                    <div class="flex space-x-4">
                        <p 
                            class="relative h-10 w-10 rounded-full bg-primary-green flex items-center justify-center cursor-pointer"
                            @click="openEditModal(contact._id)"
                        >
                        <span   
                        class="input-icon absolute left-3 top-2 text-white sm:text-base text-xs">
                        <fa-icon icon="edit"/>
                    </span>
                    </p>
                    <!-- <p 
                        class=" h-10 w-10 rounded-full bg-primary-blue flex items-center justify-center cursor-pointer"
                    >
                        Share
                    </p> -->
                    <p 
                        class="relative h-10 w-10 rounded-full bg-primary-red flex items-center justify-center cursor-pointer"
                        @click="deleteContact(contact._id)"
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
       <div>
        <div class="flex items-center space-x-3  mt-10">
            <button class="base-btn bg-primary-green w-full" @click="isShowUsers = true">Users</button>
            <button class="base-btn bg-primary-blue  w-full" @click="getUserRequest()">Request</button>
        </div>
        <div class="shadow-md rounded-md  mt-4 bg-white" style="height: 500px;" v-if="isShowUsers">
            <ul class="bg-slate-100 mb-4 p-4" v-for="user in usersThatCanBeAdded" :key="user._id">
                <li class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 rounded-full bg-slate-400 flex justify-center items-center">
                            <p class="text-lg text-white capitalize">{{ user.firstname.charAt(0) }} {{ user.lastname.charAt(0) }}</p>
                        </div>
                        <p class=" text-primary-gray font-title capitalize"> {{ user.firstname }} {{ user.lastname }}</p>
                    </div>
                    <div class="flex space-x-4">
                        <p 
                        class="relative h-10 w-10 rounded-full bg-primary-green flex items-center justify-center cursor-pointer"
                        @click="addContact(user._id)"
                    >
                        <span   
                            class="input-icon absolute left-3 top-2 text-white sm:text-base text-xs">
                            <fa-icon icon="user-plus"/>
                        </span>
                    </p>
                </div>
               
                </li>
            </ul>
       </div> 
       <div class="shadow-md rounded-md  mt-4 bg-white" style="height: 500px;" v-if="!isShowUsers">
            <ul class="bg-slate-100 mb-4 p-4" v-for="request in requests" :key="request._id">
                <li class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-14 h-14 rounded-full bg-slate-400 flex justify-center items-center">
                            <p class="text-lg text-white capitalize">{{ request.firstname.charAt(0) }} {{ request.lastname.charAt(0) }}</p>
                        </div>
                        <p class=" text-primary-gray font-title capitalize"> {{ request.firstname }} {{ request.lastname }} </p>
                    </div>
                    <div class="flex space-x-4">
                        <p 
                            class=" h-10 w-10 rounded-full bg-primary-green flex items-center justify-center cursor-pointer"
                            @click="acceptRequest(request._id)"
                        >
                            A
                        </p>
                        <p 
                            class=" h-10 w-10 rounded-full bg-primary-green flex items-center justify-center cursor-pointer"
                            @click="deleteRequest(request._id)"
                        >
                            D
                        </p>
                    </div>
                </li>
            </ul>
       </div>
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
                <div class="w-full text-right flex justify-end">
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
import ModalForm from '@/components/FormComponents/ModalFormContainer.vue'
import Input from '@/components/FormComponents/Inputs.vue'
import Button from '@/components/Buttons.vue'
import { ref } from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router';
export default {
    components: { ModalForm, Input, Button},
    setup() {
        const token =  sessionStorage.getItem('jwt');
        const AuthStr = 'Bearer '.concat(token);
        const route = useRoute()
        const contactsId = ref([])
        const requestId = ref([])
        const contacts = ref([])
        const requests = ref([])
        const usersArr = ref([])
        const usersArrCopy = ref([])
        const requestedId = ref('')
        const requestOutId = ref([])
        const usersThatCanBeAdded = ref([])
        const isShowUsers = ref(true)
        const deleteUserRequest = ref([])
        const requestorContacts = ref([])
        let isShowModal = ref(false)
        const form = ref({
            firstname : '',
            lastname: '',
        })
        const userId = ref()

        const getUserDetails = async () => {
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ route.params.id, { headers: { Authorization: AuthStr } })
                contactsId.value = res.data.contacts
                requestId.value = res.data.request_in
                requestOutId.value = res.data.request_out
                getUserContacts()
                getUsers()
                getUserRequest()
            } catch (error) {
                console.log(error);
            }
        }
        getUserDetails();
       
        // Get all user contacts
        const getUserContacts = async () => {
            let userArr = JSON.parse(JSON.stringify(contactsId.value))
            let arr = []
            for (let index = 0; index <= userArr.length; index++) {
                try {
                    const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ userArr[index], { headers: { Authorization: AuthStr } })
                    arr.push(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            contacts.value = arr
        }

        // Get all the users who send requests
        const getUserRequest = async () => {
            isShowUsers.value = false
            let userArr = JSON.parse(JSON.stringify(requestId.value))
            let arr = []
            for (let index = 0; index <= userArr.length; index++) {
                try {
                    const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ userArr[index], { headers: { Authorization: AuthStr } })
                    arr.push(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            requests.value = arr
        }

        // Get All users to compare user id to your requested out ID
        const getUsers = async () => {
            let reqOutId = JSON.parse(JSON.stringify(requestOutId.value))
            let userArr = JSON.parse(JSON.stringify(contactsId.value))
            let allUsersId = []
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/AllUsers', { headers: { Authorization: AuthStr } })
                usersArr.value = res.data
                for (let index = 0; index < usersArr.value.length; index++) {
                    allUsersId.push(usersArr.value[index]._id)
                }
                let x = allUsersId.filter(item =>  reqOutId.indexOf(item) === -1)
                let z = x.filter(item =>  userArr.indexOf(item) === -1)
                usersArrCopy.value = z
                getUserThatCanBeAdded()
            } catch (error) {
                console.log(error);
            }
        }
        
        // Filtered Users that you can add
        const getUserThatCanBeAdded = async () => {
            let userArr = JSON.parse(JSON.stringify(usersArrCopy.value))
            let arr = []
            for (let index = 0; index <= userArr.length; index++) {
                try {
                    const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ userArr[index], { headers: { Authorization: AuthStr } })
                    arr.push(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            usersThatCanBeAdded.value = arr.filter(item => item.role != 'root' && item._id != route.params.id)
        }
       
        // Get user info that you send the request
        const addContact = async (id) => {
            requestedId.value = id
            let reqOutArr = []
            reqOutArr = JSON.parse(JSON.stringify(requestOutId.value))
            reqOutArr.push(id)
            let requestInArr = []
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ id, { headers: { Authorization: AuthStr } })
                requestInArr = res.data.request_in
                requestInArr.push(route.params.id)
                sendRequestToUser(requestInArr)
                addingIdToRequestOut(reqOutArr)
                getUserDetails()
            } catch (error) {
                console.log(error);
            }
        }

        // Adding your request to the user you want to connect
        const sendRequestToUser = async (arr) => {
            try {
                let payload = {
                    request_in : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+  requestedId.value, payload , { headers: { Authorization: AuthStr } })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

         // Adding the user you want to connect ID to your request out 
        const addingIdToRequestOut = async (arr) => {
            try {
                let payload = {
                    request_out : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+ route.params.id, payload, { headers: { Authorization: AuthStr } })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }


        /**  -------------- DELETE REQUEST -----------    */
        //delete request
        const deleteRequest = async (id) => {
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ id, { headers: { Authorization: AuthStr } })
                deleteUserRequest.value = res.data.request_out
                deleteIdFromRequestOut(id)
                deleteIdFromRequestIn()
                getUserDetails()
            } catch (error) {
                console.log(error);
            }
        }

        // delete this user id from request out from the user who send the request
        const deleteIdFromRequestOut = async (id) => {
            let arr  = JSON.parse(JSON.stringify(deleteUserRequest.value))
            arr.splice(arr.indexOf(route.params.id),1)
            try {
                let payload = {
                    request_out : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+  id, payload , { headers: { Authorization: AuthStr } })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

         // delete requestor user id from this user request in
        const deleteIdFromRequestIn = async () => {
            let arr  = JSON.parse(JSON.stringify( requestId.value))
            arr.splice(arr.indexOf(route.params.id),1)
            try {
                let payload = {
                    request_in : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+  route.params.id, payload , { headers: { Authorization: AuthStr } })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        /**  -------------- CONFIRM REQUEST -----------    */

         // accept request
         const acceptRequest = async (id) => {
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ id, { headers: { Authorization: AuthStr } })
                requestorContacts.value = res.data.contacts
                deleteUserRequest.value = res.data.request_out
                addIdInUserContacts(id)
                addIdInThisUserContacts(id)
                deleteIdFromRequestOut(id)
                deleteIdFromRequestIn()
                getUserRequest()
                getUserDetails()
            } catch (error) {
                console.log(error);
            }
        }

        // add this user id to user who send request
        const addIdInUserContacts = async (id) => {
            let arr  = JSON.parse(JSON.stringify(requestorContacts.value))
            arr.push(route.params.id)
            try {
                let payload = {
                    contacts : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+  id, payload , { headers: { Authorization: AuthStr } })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        // add user request to contact in this user
        const addIdInThisUserContacts = async (id) => {
            let arr  = JSON.parse(JSON.stringify(contactsId.value))
            arr.push(id)
            try {
                let payload = {
                    contacts : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/'+  route.params.id, payload , { headers: { Authorization: AuthStr } })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

         /**  -------------- MANAGE CONTACTS -----------    */

         const deleteContact = async (id) => {
            let arr  = JSON.parse(JSON.stringify(contactsId.value))
            arr.splice(arr.indexOf(id),1)
            try {
                let payload = {
                   contacts : arr
                }
                const res = await axios.patch('https://hive-test-api.onrender.com/api/v1/users/' + route.params.id, payload ,{ headers: { Authorization: AuthStr } })
                console.log(res);
                getUserContacts();
            } catch (error) {
                console.log(error);
            }
        }

        const openEditModal = async (id) => {
            isShowModal.value = true
            userId.value = id
            console.log( userId.value);
            try {
                const res = await axios.get('https://hive-test-api.onrender.com/api/v1/users/'+ id, { headers: { Authorization: AuthStr } })
                form.value.firstname = res.data.firstname
                form.value.lastname = res.data.lastname
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

        

        return {
            contacts,
            usersThatCanBeAdded,
            addContact,
            isShowUsers,
            requests,
            getUserRequest,
            deleteRequest,
            acceptRequest,
            deleteContact,
            isShowModal,
            form,
            openEditModal,
            editUser
        }

    }

}
</script>