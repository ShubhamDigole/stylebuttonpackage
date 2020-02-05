

export default {
    name: 'TimePicker',
    props: {

        interval: {
            type: Number,
            default: 1
        },
        inputClass: {
            type: String,
            default: 'btn'
        },
        time: {
            type: Object,
            default: () => ({
                hours: 0,
                minutes: 0
            })
        }
    },
    directives: {
        'click-outside': {
          bind: function(el, binding, vNode) {
            // Provided expression must evaluate to a function.
            if (typeof binding.value !== 'function') {
                const compName = vNode.context.name
              let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
              if (compName) { warn += `Found in component '${compName}'` }
              
              console.warn(warn)
            }
            // Define Handler and cache it on the element
            const bubble = binding.modifiers.bubble
            const handler = (e) => {
              if (bubble || (!el.contains(e.target) && el !== e.target)) {
                  binding.value(e)
              }
            }
            el.__vueClickOutside__ = handler
    
            // add Event Listeners
            document.addEventListener('click', handler)
                },
          
          unbind: function(el) {
            // Remove Event Listeners
            document.removeEventListener('click', el.__vueClickOutside__)
            el.__vueClickOutside__ = null
    
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
            this.$emit('selectHours', value)
        },
        minutesChanged(value){
            this.displayMinutes = false;
            this.$emit('selectMinutes', value)
        },
        hideDialog(){
               this.displayMinutes = false;
        },
        setMinutes() {
            if (this.value !== 5 && this.value !== 1 && this.value !== 10 && this.value !== 15) {
                this.value = 1;
            }
            if (this.time.hours > 11) {
                this.time.hours = 0;
            }
            if (this.time.minutes % this.value !== 0) {
                this.time.minutes = 0;
            }
            for (let i = 1; i <= 59; i++) {
                if (i % this.value == 0) {
                    this.mins.push(i)
                }
            }
           
        }
    },
    watch:{
        time:{
            handler: function () {
                this.$emit('selectTime', this.time)
              },
              deep: true
        }
    },
    computed: {
       
        formatHours(){
            if (this.time.hours < 10){
              return "0" + this.time.hours;
            }
            return this.time.hours
        },
        formatMinutes(){
            if (this.time.minutes < 10){
              return "0" + this.time.minutes;
            }
            return this.time.minutes
          }
    },
    mounted() {
        this.setMinutes();
    }

};