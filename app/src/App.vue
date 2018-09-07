<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info" sticky>
      <b-container>
        <b-navbar-toggle target="nav_collapse">hello</b-navbar-toggle>

        <b-navbar-brand :to="{ name: 'main' }">SafeNetToken</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item-dropdown text="CreateRequest" right>
              <b-dropdown-item href="enter">Enter to cooperation</b-dropdown-item>
              <b-dropdown-item href="percentage">Change percentage</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item :to="{ name: 'requests-list' }">List</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'user-page' }">Profile</b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-container>
    </b-navbar>

    <div class="mt-4">
      <b-container>
        <router-view></router-view>
      </b-container>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

