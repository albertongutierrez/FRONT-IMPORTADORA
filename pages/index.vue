<template>
  <v-row justify="center" align="center" class="contianer-fluid">
    <v-col cols="12" lg="12">
      <div v-if="$store.state.token">
      <h1 class="text-center">Empleados</h1>
        <v-container>
          <nuxt-link
            :to="{
              path: 'empleados/create-empleado',
            }"
            ><v-btn class="primary float-right">+ Crear</v-btn></nuxt-link
          >
          <br />
          <br />
          <v-simple-table dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Id</th>
                  <th class="text-left">Name</th>
                  <th class="text-left">Sexo</th>
                  <th class="text-left">Sueldo</th>
                  <th class="text-left">Estado</th>
                  <th class="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody v-if="$store.state.empleados.length > 0">
                <tr v-for="product in $store.state.empleados" :key="product.id">
                  <td>{{ product.id }}</td>
                  <td>{{ product.nombre }}</td>
                  <td>{{ product.sexo === "M" ? "Masculino" : "Femenino" }}</td>
                  <td>{{ product.salario }}</td>
                  <td>{{ product.estado === "A" ? "Activo" : "Inactivo" }}</td>
                  <td>
                    <nuxt-link
                      :to="{
                        name: 'empleados-empleadoid',
                        path: 'empleados/:empleadoid',
                        params: { empleadoid: product.id },
                      }"
                      ><v-btn class="secondary">Editar</v-btn></nuxt-link
                    >

                    <v-btn @click="deletePro(product.id)" class="error"
                      >Eliminar</v-btn
                    >
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <h3>Record Not Found</h3>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </div>
      <div v-else>
        <v-card-title class="headline"> Favor de iniciar Sesión </v-card-title>
      </div>
    </v-col>
  </v-row>
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
  mounted() {
    this.getAllempleados();
  },
};
</script>
