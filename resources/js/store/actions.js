import axios from 'axios'
axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token');
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`;
      }
  
      return config;
    }, 
  
    (error) => {
      return Promise.reject(error);
    }
  );
export default {
    registerUser({commit, state}, user){
        return axios.post('http://localhost/calendar/public/api/auth/register', user).then(response => {
            return response
        }).catch(err => {
            return err
        })
    },
    loginUser({commit, state}, user){
        return axios.post('http://localhost/calendar/public/api/auth/login', user).then(response => {
            commit('SET_TOKEN', response.data.token)
            commit('SET_USER', response.data.user)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            return response
        }).catch(err => {
            return err
        })
    },
    logoutUser({commit}){
        commit('REMOVE_TOKEN')
        commit('REMOVE_USER')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
    setReservation({commit, state}, reservation){
        return axios.post('http://localhost/calendar/public/api/auth/reservation', reservation).then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        })
    },
    getReservedDates({commit}, params){
        axios.get('http://localhost/calendar/public/api/auth/dates', {params}).then((res) => {
            commit('RESERVED_DATES', res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
}