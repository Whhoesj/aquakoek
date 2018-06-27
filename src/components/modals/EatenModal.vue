<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h1 class="display-3">Geniet van je<br/>{{koekName}}!</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import EventBus from '../../events';

    export default {
        name: "EatenModal",
        mounted() {
            let vm = this;
            EventBus.$on('showeaten', (koekName) => {
                vm.openModal(koekName);
            });
        },
        data() {
            return {
                koekName: "",
            }
        },
        methods: {
            openModal(koekName) {
                this.koekName = koekName.toLowerCase();
                $(this.$el).modal('show');
                let vm = this;
                window.setTimeout(() => {
                    $(vm.$el).modal('hide');
                }, 3000);
            },
        }
    }
</script>

<style scoped>

</style>
