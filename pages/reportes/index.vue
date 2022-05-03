<template >
  <div>
    <v-container class="text-center">
      <div>
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :disabled="item.disabled" >
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
      <h1 class="text-center text-white mb-5">Reportes</h1>
      <v-row justify="center" style="height: 150px">
        <v-card outlined class="mr-3">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Usuarios
              </v-list-item-title>
              <v-list-item-subtitle> Reporte de Usuarios </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions class="text-center">
            <nuxt-link
              v-if="$store.state.token"
              to="reportes/reporte-usuarios"
              class="text--white"
              style="margin: 0 auto"
            >
              <v-btn outlined rounded color="warning" >
                Ir
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
        <v-card outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Empleados
              </v-list-item-title>
              <v-list-item-subtitle>
                Reporte de Empleados
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions class="text-center">
            <nuxt-link
              v-if="$store.state.token"
              to="reportes/reporte-empleados"
              class="text--white"
              style="margin: 0 auto"
            >
              <v-btn outlined rounded color="warning">
                Ir
              </v-btn>
            </nuxt-link>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  middleware: ["auth"],
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
          disabled: true,
          href: "",
        },
      ],
    };
  },
};
</script>
<style >
</style>