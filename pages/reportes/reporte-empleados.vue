

<template>
  <v-container class="text-center" >
    <v-row class="contianer-fluid" >
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
          <h1 class="text-center mb-5">Reporte de Empleados</h1>
          <v-simple-table dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Sexo</th>
                  <th class="text-left">Sueldo</th>
                  <th class="text-left">Estado</th>
                </tr>
              </thead>
              <tbody v-if="$store.state.empleados.length > 0">
                <tr v-for="product in $store.state.empleados" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.nombre }}</td>
                  <td>{{ product.sexo === "M" ? "Masculino" : "Femenino" }}</td>
                  <td>{{ product.salario }}</td>
                  <td>{{ product.estado === "A" ? "Activo" : "Inactivo" }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <h3>Record Not Found</h3>
              </tbody>
            </template>
          </v-simple-table>
          <!-- </v-container> -->
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
    ...mapActions(["getAllempleados"]),
    ...mapActions(["deleteempleados"]),
    async deletePro(id) {
      const data = {
        id: id,
      };
      await this.deleteempleados(data);
      await this.getAllempleados();
    },
  },
  middleware: ["auth"],
  mounted() {
    this.getAllempleados();
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
          text: "Reporte Empleados",
          disabled: true,
          href: "",
        },
      ],
    };
  },
};
</script>
