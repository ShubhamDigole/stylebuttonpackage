

export default {
    name: 'Search',
    props: {

        interval: {
            type: Number,
            default: 1
        },
        inputclass: {
            type: String,
            default: 'btn'
        },
        timeObject: {
            type: Object,
            default: () => ({
                hours: 0,
                minutes: 0
            })
        }
    },
    directives: {
        outside: {
            bind: function (el, binding, vNode) {
                const handler = (e) => {
                    if (!el.contains(e.target) && el !== e.target) {
                        console.log('outside');  
                        vNode.context[binding.expression] = false
                    }
                }
                el.out = handler
                document.addEventListener('click', handler)
            },
        
            unbind: function (el) {
                document.removeEventListener('click', el.out)
                el.out = null
            }
        }
    },
    data() {
        return {
            value: this.interval,
            mins: [0],
            displayMinutes: false
        };


    },
    methods: {
        openDialog() {
            this.displayMinutes = true;
        },
        hoursChanged(value){
            this.$emit('hours', value)
        },
        minutesChanged(value){
            this.displayMinutes = false;
            this.$emit('minutes', value)
        },
        hideDialog(){
                alert('event called')
               this.displayMinutes = false;
        }
    },
    watch:{
        timeObject(){
            console.log(this.timeObject);
        }
    },
    computed: {
        setMinutes() {
            if (this.value !== 5 && this.value !== 1 && this.value !== 10 && this.value !== 15) {
                this.value = 1;
            }
            if (this.timeObject.hours > 11) {
                this.timeObject.hours = 0;
            }
            if (this.timeObject.minutes % this.value !== 0) {
                this.timeObject.minutes = 0;
            }
            for (let i = 1; i <= 59; i++) {
                if (i % this.value == 0) {
                    this.mins.push(i)
                }
            }
           
        },
        // formatHours(){
        //     if (this.timeObject.hours < 10){
        //       return "0" + this.timeObject.hours;
        //     }
        //     return this.timeObject.hours
        // },
        // formatMinutes(){
        //     if (this.timeObject.minutes < 10){
        //       return "0" + this.timeObject.minutes;
        //     }
        //     return this.timeObject.minutes
        //   }
    },
    mounted() {
        this.setMinutes
    }

};