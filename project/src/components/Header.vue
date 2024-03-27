<template>
    <header>
        <nav class="bg-gray-800 p-4">
            <ul class="flex justify-center space-x-4">
                <li><router-link to="/myTasks" class="text-white hover:text-gray-200">My tasks</router-link></li>
                <li>|</li>
                <li><router-link to="/tasks" class="text-white hover:text-gray-200">Tasks</router-link></li>
                <li>|</li>
                <li><router-link to="/register" class="text-white hover:text-gray-200">Create user</router-link></li>
                <li>|</li>
                <li><router-link to="/resetPass" class="text-white hover:text-gray-200">Reset password</router-link></li>
            </ul>
        </nav>
    </header>
</template>


<script>
export default{
    
}
</script>