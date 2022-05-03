
<template>
  <v-container class="text-center">
    <v-row class="contianer-fluid">
      <div class="float-left">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled">
              <nuxt-link
                :to="{
                  path: item.href,
                }"
              >
                {{ item.text }}
              </nuxt-link>
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </div>
    </v-row>
    <v-row justify="center" align="center" class="contianer-fluid">
      <v-col cols="12" lg="12">
        <div v-if="$store.state.token">
          <h1 class="text-center mb-5">Reporte de Usuarios</h1>
          <v-simple-table dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Correo</th>
                  <th class="text-left">Fecha Creación</th>
                </tr>
              </thead>
              <tbody v-if="$store.state.user.length > 0">
                <tr v-for="user in $store.state.user" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ $moment(user.created_at).format("DD/MM/YYYY") }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <h3>Record Not Found</h3>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <div v-else>
          <v-card-title class="headline">
            Favor de iniciar Sesión
          </v-card-title>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "IndexPage",
  methods: {
    ...mapActions(["getAllUser"]),
  },
  middleware: ["auth"],
  mounted() {
    this.getAllUser();
  },
  data() {
    return {
      items: [
        {
          text: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          text: "Reportes",
          disabled: false,
          href: "/reportes",
        },
        {
          text: "Reporte Usuarios",
          disabled: true,
          href: "",
        },
      ],
    };
  },
};
</script>
