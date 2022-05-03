<template>
  <div>
    <v-container>
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
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
              <h1 class="my-4 text-center pt-5">Actualizar empleado </h1>
            <v-card-text class="pb-12">
              <form action=""  @submit.prevent="updatePro">
                <v-textField
                  label="id"
                  v-model="id"
                  type="text"
                  readonly
                  disabled
                ></v-textField>
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
                <v-btn color="warning" class="float-right mb-5" type="submit">Actualizar</v-btn>
              </form>
            </v-card-text>
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
      id: "",
      nombre: "",
      estado: "",
      sexo: "",
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
          text: "Acrualizar Empleado",
          disabled: true,
          href: "",
        },
      ],
    };
  },

  methods: {
    async getempleadosById() {
      const data = {
        id: this.$route.params.empleadoid,
      };
      const res = await this.$axios.get("empleados/" + parseInt(data.id));
      if (res.data.type == 1) {
        this.id = data.id;
        this.nombre = res.data.data.nombre;
        this.estadoV = res.data.data.estado === "A" ? "Activo" : "Inactivo";
        this.sexoV = res.data.data.sexo === "M" ? "Masculino" : "Femenino";
        this.salario = res.data.data.salario;
      }
    },

    ...mapActions(["updateempleados"]),
    updatePro() {
      if (!this.id || !this.nombre || !this.salario || !this.sexoV || !this.estadoV) {
        alert("Todos los compos son requeridos");
      } else {
        const data = {
          id: this.id,
          nombre: this.nombre,
          salario: this.salario,
          sexo: this.sexoV==='Masculino'?'M':'F',
          estado: this.estadoV==='Activo'?'A':'I'
        };
        this.updateempleados(data);
      }
    },
  },
  mounted() {
    this.getempleadosById();
  },
};
</script>
<style>
</style>