<template>
  <b-col xl="2" lg="3" md="3" sm="4" cols="12" class="mb-4">
    <b-card class="mb-4 border-0">
      <p>
        <b-card-img-lazy
          :src="productPros.image"
          height="200"
        ></b-card-img-lazy>
        <b-card-body>
          <b-card-title
            v-b-modal.modal-center
            @click="$bvModal.show('modal-productDetails-' + productPros.id)"
            >{{ productPros.name }}
            <b-card-sub-title class="mb-2">{{
              productPros.price | currency
            }}</b-card-sub-title>
          </b-card-title>
        </b-card-body>
        <b-button v-show="product.quantity > 0" @click="addToCart">
          <font-awesome-icon icon="minus" class="mr-1" variant="danger" />
        </b-button>
        <b-button size="sm" variant="light" v-show="product.quantity > 0" class>
          {{ product.quantity }} in cart</b-button
        >
        <b-button
          v-show="product.quantity > 0"
          variant="light"
          @click="addToCart"
        >
          <font-awesome-icon icon="plus" class="mr-1" />
        </b-button>
        <b-button
          size="sm"
          variant="light"
          v-show="product.quantity == 0"
          @click="addToCart"
          class
        >
          <font-awesome-icon icon="shopping-cart" class="mr-1" />Add to cart
        </b-button>
      </p>
    </b-card>
    <ProductDetails :ProductDetails="productPros" />
  </b-col>
</template>

<script>
import { mapState } from "vuex";
import ProductDetails from "./productDetail";
export default {
  components: {
    ProductDetails,
  },
  props: {
    productPros: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      // console.log("da click addtoclick");
      // console.log(this.productPros);
      this.$store.dispatch("addToCart", this.productPros);
    },
    removeFromCart() {
      this.$store.dispatch("removeFromCart", this.productPros);
    },
  },
  computed: {
    ...mapState(["cartItems"]),
    product() {
      let productItem = this.cartItems.find(
        (element) => element.id === this.productPros.id
      );
      if (productItem) {
        return productItem;
      } else {
        return {
          quantity: 0,
        };
      }
    },
  },
};
</script>


<style  scoped></style>