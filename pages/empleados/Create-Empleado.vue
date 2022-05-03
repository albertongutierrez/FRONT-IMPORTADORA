<template>
  <div>
    <v-container>
      <div>
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
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <h1 class="my-4 text-center pt-5">Crear empleado</h1>
            <v-card-title>
              <form action="" id="w-100" @submit.prevent="create">
                <v-textField
                  label="Nombre"
                  v-model="nombre"
                  type="text"
                ></v-textField>
                <v-textField
                  label="Salario"
                  type="number"
                  v-model="salario"
                ></v-textField>
                <v-select
                  :items="sexo"
                  v-model="sexoV"
                  label="Sexo"
                  outlined
                ></v-select>
                <v-select
                  :items="estado"
                  v-model="estadoV"
                  label="Estado"
                  outlined
                ></v-select>
                <v-btn color="primary" class="float-right" type="submit"
                  >Guardar</v-btn
                >
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
  middleware: ["auth"],
  data() {
    return {
      nombre: "",
      salario: "",
      estado: ["Activo", "Inactivo"],
      estadoV: "",
      sexo: ["Masculino", "Femenino"],
      sexoV: "",
      items: [
        {
          text: "Inicio",
          disabled: false,
          href: "/",
        },
        {
          text: "Crear Empleado",
          disabled: true,
          href: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["createempleados"]),
    create() {
      if ( !this.nombre || !this.salario || !this.sexoV || !this.estadoV) {
        this.$toast.error("Todos los compos son requeridos");
      } else {
        const data = {
          nombre: this.nombre,
          salario: this.salario,
          sexo: this.sexoV === "Masculino" ? "M" : "F",
          estado: this.estadoV === "Activo" ? "A" : "I",
        };
        this.createempleados(data);
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