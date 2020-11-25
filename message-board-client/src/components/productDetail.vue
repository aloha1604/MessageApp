<template>
  <div>
    <b-modal
      centered
      no-fade
      hide-backdrop
      :id="'modal-productDetails-' + ProductDetails.id"
      scrollable
      :title="ProductDetails.name"
      hide-footer
    >
      <template v-slot:default>
        <template>
          <div class="pd-image centeret">
            <b-img
              center
              width="200"
              height="200"
              :src="ProductDetails.image"
              fluid
              alt="Responsive image"
            ></b-img>
          </div>

          <div class="pt-4">
            <h6 class="text-center">
              Price : {{ ProductDetails.price | currency }}
            </h6>
            <p>{{ ProductDetails.description }}</p>
            <div class="pt-4 pb-4 text-center">
              <b-button
                size="sm"
                variant="danger"
                @click="removeFromCart"
                class
              >
                <font-awesome-icon icon="minus" class="mr-1" />
              </b-button>

              <b-button size="sm" variant="light" class
                >{{ ProductDetails.quantity }} in cart</b-button
              >
              <b-button size="sm" variant="secondary" @click="addToCart" class>
                <font-awesome-icon icon="plus" class="mr-1" />
              </b-button>

              <b-button size="sm" variant="light" @click="addToCart" class>
                <font-awesome-icon icon="shopping-cart" class="mr-1" />Add to
                cart
              </b-button>
            </div>
          </div>
        </template>
        <template></template>
      </template>

      <template v-slot:modal-footer>
        <template else>
          <div></div>
        </template>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    ProductDetails: {
      type: Object,
      required: true,
    },
    computed: {
      ...mapState(["cartItems"]),
      ...mapGetters(["cartTotal"]),
    },
  },
};
</script>
<style scoped>
</style>