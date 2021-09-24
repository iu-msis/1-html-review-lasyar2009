
const user_info = {
    data(){
        return {
            "result": {
                "name":"",
                "dob":{
                    "date":""
                }
            }
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
           console.log("A");
            fetch('https://randomuser.me/api/')
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                console.log("C");
                this.result = responseJson.results[0];
                console.log(this.result)
            })
            .catch( (err) => {
                console.error(err);
            })
            console.log("B");
        }
    },
    created() {
        this.fetchUserData();
    } //end created
} // end Offer config
  
Vue.createApp(user_info).mount('#UserInfo');
console.log("Z");