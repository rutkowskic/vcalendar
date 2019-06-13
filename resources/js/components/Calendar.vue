<template>
    <div>
        <table class="table table-hover" style="text-align: center;">
            <thead>
                <tr>
                    <th scope="col">Poniedziałek</th>
                    <th scope="col">Wtorek</th>
                    <th scope="col">Środa</th>
                    <th scope="col">Czwartek</th>
                    <th scope="col">Piątek</th>
                    <th scope="col">Sobota</th>
                    <th scope="col">Niedziela</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(weak, index) in getFullCalendar()" v-bind:key="index">
                    <td v-for="day in weak" v-bind:key="day.value">
                        <a href="" 
                        @click="getDay(day.value, $event)" 
                        :class="{ disable: !day.active, past: pastDay(day) }" 
                        >{{ day.value }}</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                now: new Date(),
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate(),
            }
        },
        methods: {
            pastDay(day){
                if(day.active && day.value < this.now.getDate()){
                    return true
                }
            },
            getDay(day, event){
                event.preventDefault()
                this.$router.push({ name: 'reservation', params: { year: this.year, month: this.month, day }})
            },
            chunkArray(array, size) {
                let result = []
                for (let i = 0; i < array.length; i += size) {
                    let chunk = array.slice(i, i + size)
                    result.push(chunk)
                }
                return result
            },
            firstDayInMonth(){
                return new Date(this.year, this.month, 1).getDay();
            },
            daysInPrevMonth(){
                return new Date(this.year, this.month, 0).getDate();
            },
            daysInMonth(){
                let days = new Date(this.year, this.month + 1, 0).getDate();
                if (days === 0) {
                    days = 7;
                }
                return days;
            },
            prevMonthDays(){
                let arr = [];
                let a = this.daysInPrevMonth() - (this.firstDayInMonth() - 2);
                for(let i=a; i<=this.daysInPrevMonth(); i++){
                    arr.push(i);
                }
                return arr;
            },
            getFullCalendar(){
                let arr = [];
                let chunks = [];
                let n = 1;
                let indexWeak;
                if(this.firstDayInMonth() !== 1){
                    let a = this.daysInPrevMonth() - (this.firstDayInMonth() - 2);
                    for(let i=a; i<=this.daysInPrevMonth(); i++){
                        arr.push({value: i, active: false});
                    }
                } 
                for(let i=1; i<=this.daysInMonth(); i++){
                    arr.push({value: i, active: true});
                }
                chunks = this.chunkArray(arr, 7);
                while ( chunks[chunks.length - 1].length < 7) {
                    chunks[chunks.length - 1].push({value: n, active: false});
                    n++;
                }
                return chunks;
            }
        }
    }
</script>

<style>
    .disable{
        color: lightgray;
        pointer-events: none;
        cursor: default;
    }
    .past{
        color: grey;
        pointer-events: none;
        cursor: default;
    }
</style>