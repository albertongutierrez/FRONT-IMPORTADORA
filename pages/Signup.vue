<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
              <h1 class="my-4 text-center pt-5">Crear Cuenta</h1>
            <v-card-title>
              <form action="" id="w-100" @submit.prevent="signup">
                <v-textField
                  label="Correo"
                  type="email"
                  v-model="email"
                ></v-textField>
                <v-textField
                  label="Enter Your Password"
                  type="password"
                  v-model="password"
                ></v-textField>
                 <p>
                  ¿Ya tiene Cuena?
                  <nuxt-link
                    :to="{
                      path: 'login',
                    }"
                  >
                    Inicie Sesión
                  </nuxt-link>
                </p>
                <v-btn color="primary" type="submit">Continuar</v-btn>
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
  middleware: "guest",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["createUser"]),
    signup() {
      if (!this.email || !this.password) {
        alert("Todos los campos son requeridos");
      } else {
        const data = {
          email: this.email,
          password: this.password,
        };
        this.createUser(data);
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