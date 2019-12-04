<template>
    <div class="content">

        <b-tabs type="is-toggle" size="is-medium" expanded>
              <b-tab-item label="Leave">
                <md-card-content>
                  <my-leave></my-leave>
                </md-card-content>
              </b-tab-item>

              <b-tab-item :visible="true" label="PO">
                <md-card-content>
                  <my-PO></my-PO>
                </md-card-content>
              </b-tab-item>

              <b-tab-item :visible="true" label="PSR">
                <md-card-content>
                  <my-PSR></my-PSR>
                </md-card-content>
              </b-tab-item>
        </b-tabs>
  </div>
</template>

<script>
import { myLeave, myPO, myPSR} from "@/components";

export default {
  components: {
    myLeave,
    myPO,
    myPSR
  }
};
</script>