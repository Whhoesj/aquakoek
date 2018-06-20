<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="example-modal-label"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="example-modal-label">Modal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "example-modal",
        mounted: function () {
            // events.EventBus.$on(events.EVENT_MODAL_CONNECTION_SETTINGS, this.openAndUpdate);
        },
        methods: {
            openAndUpdate() {
                $(this.$el).modal('show');
            },
        }
    }
</script>

<style scoped>

</style>