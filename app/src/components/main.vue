<template>
  <div>
    <h1>Main Page</h1>
    <router-link :to="{ name: 'enter-request' }">Create Request</router-link>
    <br>
    <router-link :to="{ name: 'requests-list' }">Requests List</router-link>
    <br>
    <router-link :to="{ name: 'user-page' }">Profile</router-link>
  </div>
</template>

<script>
  export default {
      name: "main"
  }
</script>
