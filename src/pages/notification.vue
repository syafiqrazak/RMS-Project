<template>
  <div class="content">

        <b-tabs type="is-toggle" size="is-medium" expanded>
              <b-tab-item label="Leave Application">
                <md-card-content>
                  <notify-leave></notify-leave>
                </md-card-content>
              </b-tab-item>

              <b-tab-item :visible="true" label="PO">
                <md-card-content>
                  <notify-PO></notify-PO>
                </md-card-content>
              </b-tab-item>

              <b-tab-item :visible="true" label="PSR">
                <md-card-content>
                  <notify-PSR></notify-PSR>
                </md-card-content>
              </b-tab-item>
        </b-tabs>
  </div>
</template>

<script>
import { SimpleTable, notifyLeave, notifyPO, notifyPSR } from "@/components";

export default {
  components: {
    SimpleTable,
    notifyLeave,
    notifyPO,
    notifyPSR,
  }
};
</script>
