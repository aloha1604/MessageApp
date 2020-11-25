<template>
  <div id="Home">
    <div id="nav">
      <b-container fluid>
        <!-- product -->
        <b-row>
          <div class="col-lg-12 mt-4">
            <div class="row">
              <!-- component product -->
              <product
                v-for="product in products"
                :key="product.id"
                :productPros="product"
              ></product>
              <!-- {{ products }} -->
            </div>
          </div>
        </b-row>
        <!-- prv next -->
        <div class="row mb-5">
          <div class="col-lg-12">
            <span v-if="page != 1"
              ><b-link
                :to="{ name: 'home', query: { page: page - 1 } }"
                rel="prev"
                >Prev Page
              </b-link>
            </span>
            <span
              ><b-link
                v-if="hasNextPage"
                :to="{ name: 'home', query: { page: page + 1 } }"
                rel="next"
                >Nex Page
              </b-link></span
            >
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Product from "../components/Product.vue";
export default {
  name: "home",
  components: { Product },
  data() {
    return {
      categories: ["HP", "Dell", "Asus", "Mac"],
    };
  },
  methods: {},
  created() {
    this.perPage = 12;
    this.$store.dispatch("getProducts", {
      perPage: this.perPage,
      page: this.page,
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    hasNextPage() {
      return this.totalProducts > this.page * this.perPage;
    },
    ...mapState(["products", "totalProducts"]),
  },
};
</script>

<style scoped>
</style>
