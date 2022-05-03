export const state = () => ({
    token: localStorage.getItem('token') || '',
    user: {},
    empleados: []
})

export const getters = {
    user: (state) => {
        return state.user
    },
    token: (state) => {
        return state.token
    },
    empleados: (state) => {
        return state.empleados;
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token
    },
    setEmpleados(state, empleados) {
        state.empleados = empleados;
    }
}


export const actions = {
    async createUser(_, data) {
        try {
            const res = await this.$axios.post('user/create', data);
            if (res.data.type == 1) {
                alert(res.data.message);
                data.name = "";
                data.email = "";
                data.password = "";
                this.$router.push('/login');
            } else {
                alert(res.data.message)
            }
        } catch (err) {
            if (err.message === 'Request failed with status code 422') {
                alert('Usuario Existe')
            } else {
                alert(err.message)
            }
        }
    },

    async loginUser({ commit }, data) {
        const res = await this.$axios.post('user', data);
        if (res.data.type == 1) {
            // data.email = "";
            // data.password = "";

            localStorage.setItem('token', res.data.user);
            // console.log(res.data);
            commit('setToken', res.data.user);
            // alert(res.data.message)
            this.$router.push("/");

        } else {
            alert(res.data.message);
        }
    },

    async logoutUser({ commit }) {
        commit('setToken', '');
        localStorage.removeItem('token');
        this.$router.push("/login")
    },


    async readUser({ commit }) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
        const res = await this.$axios.get('user', config);
        if (res.data.status == 1) {
            commit('setUser', res.data.message);
        } else {
            alert(res.data.message);
        }
    },

    async createempleados(_, data) {
        const config = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
        const res = await this.$axios.post('empleados', data, config);
        if (res.data.status == 1) {
            alert(res.data.message);
            this.$router.push('/empleados/');
        } else {
            alert(res.data.message);
        }
    },

    async deleteempleados({ commit, state }, data) {
        const res = await this.$axios.delete('empleados', { params: { id: data.id } });
        if (res.data.type == 1) {
            alert(res.data.message);
        } else {
            alert(res.data.message);

        }
    },
    async getAllempleados({ commit }) {
        const res = await this.$axios.get('empleados');
        if (res.data.length > 0) {
            commit('setEmpleados', res.data);
        }
    },

    async updateempleados(_, data) {
        const res = await this.$axios.put('empleados', data);
        if (res.data.type == 1) {
            alert(res.data.message);
            this.$router.push('/')
        } else {
            alert(res.data.message);
        }
    }
}