export default {
    SET_USER: (state, user) => {
        state.user = user
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    REMOVE_TOKEN: (state) => {
        state.token = ''
    },
    REMOVE_USER: (state) => {
        state.user = {}
    },
    RESERVED_DATES: (state, dates) => {
        state.reserved_dates = dates
    }
}