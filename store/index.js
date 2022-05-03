export const state = () => ({
    token: localStorage.getItem('token') || '',
    user: [],
    users: '',
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
    setUsers(state, users) {
        state.users = users
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
                this.$toast.success(res.data.message);
                data.name = "";
                data.email = "";
                data.password = "";
                this.$router.push('/login');
            } else {
                this.$toast.error(res.data.message);
            }
        } catch (err) {
            if (err.message === 'Request failed with status code 422') {
                this.$toast.error('Usuario Existe');
            } else {
                this.$toast.error(err.message);
            }
        }
    },

    async loginUser({ commit }, data) {
        const res = await this.$axios.post('user', data);
        if (res.data.type == 1) {
            localStorage.setItem('token', res.data.user);
            commit('setUsers', res.data.mail);
            commit('setToken', res.data.user);

            this.$router.push("/");
            this.$toast.success(res.data.message);

        } else {
            this.$toast.error(res.data.message);
        }
    },

    async getAllUser({ commit }) {
        const res = await this.$axios.get('user');
        if (res.data.length > 0) {
            commit('setUser', res.data);
        }
    },

    async logoutUser({ commit }) {
        commit('setToken', '');
        localStorage.removeItem('token');
        this.$router.push("/login")
    },


    async createempleados(_, data) {
        const res = await this.$axios.post('empleados', data);
        if (res.data.type == 1) {
            this.$toast.success(res.data.message);
            this.$router.push('/');
        } else {
            this.$toast.error(res.data.message);
        }
    },

    async deleteempleados({ commit, state }, data) {
        const res = await this.$axios.delete('empleados', { params: { id: data.id } });
        if (res.data.type == 1) {
            this.$toast.success(res.data.message);
        } else {
            this.$toast.error(res.data.message);
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
            this.$toast.success(res.data.message);
            this.$router.push('/')
        } else {
            this.$toast.error(res.data.message);
        }
    }
}