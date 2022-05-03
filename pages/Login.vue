<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
              <h1 class="my-4 text-center pt-5">Iniciar Sesión</h1>
            <v-card-title>
              <form action="" id="w-100" @submit.prevent="login">
                <v-textField
                  label="Correo"
                  type="email"
                  v-model="email"
                ></v-textField>
                <v-textField
                  label="Contraseña"
                  type="password"
                  v-model="password"
                ></v-textField>
                <p>
                  ¿No tiene una cuenta?
                  <nuxt-link
                    :to="{
                      path: 'signup',
                    }"
                  >
                    Cree una
                  </nuxt-link>
                </p>
                <v-btn color="primary" type="submit">Iniciar Sesión</v-btn>
              </form>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  middleware: ["guest"],
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      if (!this.email || !this.password) {
        alert("please fill the field");
      } else {
        const data = {
          email: this.email,
          password: this.password,
        };
        this.loginUser(data);
      }
    },
  },
};
</script>
<style>
#w-100 {
  width: 100%;
}
.text-center {
  text-align: center !important;
}
</style>