<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <nuxt-link to="/">  <img src="https://ilp.com.do/wp-content/uploads/2020/02/logo-web-ilp-260.png" alt="" width="60%"></nuxt-link>
        <nuxt-link  v-if="$store.state.token" to="/" class=" text--white mr-5">Inicio </nuxt-link>
        <nuxt-link  v-if="$store.state.token" to="/reportes" class=" text--white"> Reportes</nuxt-link>
      <v-spacer />
      <v-toolbar-title v-if="$store.state.token">
        <!-- <nuxt-link to="/" class=" text--white">Inicio</nuxt-link> -->
        <span class="mr-4">{{ $store.state.users }}</span>
        <v-btn color="error" @click="logout">Cerrar Sesión</v-btn>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <nuxt-link to="/login" class="text--white">Login</nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Importadora LP",
    };
  },

  methods: {
    ...mapActions(["logoutUser"]),
    ...mapActions(["readUser"]),
    logout() {
      this.logoutUser();
    },
  },
  // mounted() {
  //   this.readUser();
  // },
};
</script>

<style>
a {
  text-decoration: none !important;
}
.text--white {
  color: white !important;
}
</style>