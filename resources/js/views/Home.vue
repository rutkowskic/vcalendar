<template>
    <section>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <calendar></calendar>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import Calendar from '../components/Calendar'
    export default {
        components: {
            Calendar,
        }
    }
</script>

