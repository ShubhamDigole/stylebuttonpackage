# TimePicker

TimePicker is Vue Component and it is created for setting Timer. Setting Events, Minutes Intevral and Classes As Per Requirements 

## Installation

Use the Node Package Manager to install TimePicker.

```bash
npm install foobar eigensteil-time-picker
```

## Usage


### Main.js

import TimePicker from 'eigensteil-time-picker';

Vue.use(TimePicker)

### Component.vue


    <template>
        <div>
            <styled-testing-button :interval="5" inputclass="btn" :time="{hours:10, minutes:40}" v-on:hours="emittedHours" v-on:minutes="emittedMinutes" v-on:selectTime="selectedTime"></styled-testing-button>
        </div>
    </template>

    <script>
    export default {
    name: 'UsingTimePicker',
    data() {
        return {

                }
            },
    methods:{
        //methods which are emmited
        emittedHours(Hours){
                console.log("Emmited Minutes: " + Hours);
                },
        emittedMinutes(Minutes){
                console.log("Emmited Minutes: " + Minutes);
                },
        selectedTime(Time){
                console.log("Selected Minutes: " + Time.hours + " Selected Minutes: " + Time.minutes);
                }
            }
        }
    </script>

## License
[MIT](https://choosealicense.com/licenses/mit/)

