import { createStore } from 'vuex'
export default createStore({
    state: {
        personalCards: [{
            id: "fe223as31d",
            name: "邓晓菲",
            avatar: 'https://i.loli.net/2021/07/11/QGjex8blPUmSB7z.jpg',
            gender: "女",
            nationality: "汉",
            adress: "江西省赣州市兴国县长冈乡石燕村居和组5号",
            telphone: "19970856021",
            identity: "360732200210036122",
            bank: "6226822014403971213",
            QQ: "2507792934",
            zhifubao: "liyu3232",
            weixin: "xiaofei96"
        }, {
            id: "fqw23as31d",
            name: "golove",
            avatar: 'https://i.loli.net/2021/07/11/QGjex8blPUmSB7z.jpg',
            gender: "女",
            nationality: "汉",
            adress: "江西省赣州市兴国县长冈乡石燕村居和组5号",
            telphone: "1223098422",
            identity: "360732200210036122",
            bank: "6226822014403971213",
            QQ: "2507792934",
            zhifubao: "liyu3232",
            weixin: "xiaofei96"
        }, {
            id: "ef223as31d",
            name: "liuziyu",
            avatar: 'https://i.loli.net/2021/07/11/QGjex8blPUmSB7z.jpg',
            gender: "女",
            nationality: "汉",
            adress: "江西省赣州市兴国县长冈乡石燕村居和组5号",
            telphone: "16675543567",
            identity: "360732200210036122",
            bank: "6226822014403971213",
            QQ: "2507792934",
            zhifubao: "liyu3232",
            weixin: "xiaofei96"
        },],
        user: {
            token: localStorage.getItem('token'),
            username: localStorage.getItem('username')
        },
        inputValue: ""
    },
    getters: {
        token: state => state.user.token,
        username: state => state.user.username,
        doneCards: state =>
            state.personalCards.filter(
                el => el.name.indexOf(state.inputValue) > -1 || el.gender.indexOf(state.inputValue) > -1
                    || el.nationality.indexOf(state.inputValue) > -1 || el.adress.indexOf(state.inputValue) > -1
                    || el.telphone.indexOf(state.inputValue) > -1 || el.identity.indexOf(state.inputValue) > -1
                    || el.bank.indexOf(state.inputValue) > -1 || el.QQ.indexOf(state.inputValue) > -1
                    || el.zhifubao.indexOf(state.inputValue) > -1 || el.weixin.indexOf(state.inputValue) > -1
            )

    },
    mutations: {
        search(state, data) {
            state.inputValue = data
        },
        BIND_LOGIN: (state, data) => {
            localStorage.setItem('token', data)
            state.user.token = data
        },
        BIND_LOGOUT: (state) => {
            localStorage.removeItem('token')
            state.user.token = null
        },
        SAVE_USER: (state, data) => {
            localStorage.setItem('username', data)
            state.user.username = data
        }
    },
    actions: {},
    modules: {}
})