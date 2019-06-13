<template>
    <section class="mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <ul class="list-group list-group-flush">
                        <li style="text-align:center;" 
                        :class="{ 'list-group-item': true, 'list-group-item-dark': isOccupied(hour), 'list-group-item-success': isReserved(hour), 'active': isActive(hour)}" 
                        v-for="hour in range(8, 16)" 
                        :key="hour"
                        v-on="isExistInReservedData(hour) ? {} : { click: () => selectHour(hour) } "
                        >
                        {{hour}}:00
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-4 offset-md-4 mt-4">
                <button class="btn btn-primary btn-lg btn-block" @click="setReservation()" :disabled="!timeCandidate">Reservation</button>
            </div>
        </div>
    </section>                
</template>
<script>
    import axios from 'axios'
    import { DateTime } from 'luxon'
    export default {
        data() {
            return {
                timeCandidate: null,
                dates: []
            }
        },
        mounted(){
            this.getReservedDates()
        },
        computed: {
            reservedDates() {
                return this.$store.getters.reserved_dates
            }
        },
        methods: {
            isExistInReservedData(hour){
                let exist = false;
                this.reservedDates.forEach(item=>{
                    let existHour = new Date(item.reservation_date).getHours()

                    if(existHour === hour){
                        exist = true;
                    }
                })
                return exist
            },
            isActive(hour){
                return this.timeCandidate === hour
            },
            isOccupied(hour){
                let occupied = false;
                this.reservedDates.forEach(item=>{
                    let existHour = new Date(item.reservation_date).getHours()

                    if(existHour === hour && item.user_id !== this.$store.getters.user.id){
                        occupied = true;
                    }
                })
                return occupied
            },
            isReserved(hour) {
                let reserved = false;
                this.reservedDates.forEach(item=>{
                    let existHour = new Date(item.reservation_date).getHours()

                    if(existHour === hour && item.user_id === this.$store.getters.user.id){
                        reserved = true;
                    }
                })
                return reserved
            },
            getReservedDates(){
                const params = {
                    year: this.$route.params.year,
                    month: this.$route.params.month + 1,
                    day: this.$route.params.day
                }
                this.$store.dispatch('getReservedDates', params)
            },
            setReservation(){
                const reservation = {
                    id: this.$store.getters.user.id,
                    reservation: DateTime.local(2019, this.$route.params.month + 1, this.$route.params.day, this.timeCandidate).toFormat('yyyy-MM-dd HH:mm:ss')
                }
                this.$store.dispatch('setReservation', reservation).then((response) => {
                    this.$store.dispatch('getReservedDates', {
                        year: this.$route.params.year,
                        month: this.$route.params.month + 1,
                        day: this.$route.params.day
                    }).then((response)=>{
                        this.timeCandidate = null
                    }).catch((err) => {
                        console.log(err)
                    });
                }).catch((err) => {
                    console.log(err)
                });
            },
            selectHour(hour){
                if(this.timeCandidate === hour){
                    return this.timeCandidate = null;
                }
                this.timeCandidate = hour
            },
            range(min,max){
                var array = [],
                j = 0;
                for(var i = min; i <= max; i++){
                    array[j] = i;
                    j++;
                }
                return array;
            }
        }
    }
</script>


