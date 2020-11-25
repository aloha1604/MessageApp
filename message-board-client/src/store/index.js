import Vue from "vue";
import Vuex from "vuex";

import ProductService from "../services/productService";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        product: {},
        cartItems: [],
        totalProducts: 0,
        allProductsTest: [{
            id: 'sss'
        }]

    },
    mutations: {
        ADD_CART(state, product) {
            // console.log('vao toi ADD_CART')
            // console.log(product)
            state.cartItems.push({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: 1,
                description: product.description
            })
        },
        INCREMENT_ITEM_QUANTITY(state, cartItem) {
            cartItem.quantity++;
        },
        DECREMENT_ITEM_QUANTITY(state, cartItem) {
            cartItem.quantity--;
        },
        REMOVE_CART(state, itemIndex) {
            state.cartItems.splice(itemIndex, 1);
        }
        ,
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_PRODUCTS_TOTAL(state, totalProducts) {
            state.totalProducts = totalProducts;
        },
        SET_TEST_ALLPRODUCTS(state, allproducts) {
            state.totalProducts = allproducts
        }

    },
    actions: {
        addToCart({ commit, state }, product) {
            // console.log(product)
            const cartItem = state.cartItems.find(elemnt => elemnt.id === product.id);
            if (!cartItem) {
                // console.log("vao toi !cartItem")
                commit("ADD_CART", product);
            } else {
                // console.log("vao toi cartItem")
                commit("INCREMENT_ITEM_QUANTITY", cartItem);
            }
        },
        removeFromCart({ commit, state }, product) {
            const cartItem = state.cartItems.find(
                element => element.id === product.id
            )
            if (cartItem) {
                if (cartItem.quantity <= 1) {
                    const itemIndex = state.cartItems.findIndex(x => x.id === product.id)
                    commit("REMOVE_CART", itemIndex);
                } else {
                    commit("DECREMENT_ITEM_QUANTITY", cartItem);
                }
            }
        }
        ,
        getProducts({ commit }, { perPage, page }) {
            console.log('store get products')
            ProductService.getProducts(perPage, page)
                .then(response => {
                    commit(
                        "SET_PRODUCTS_TOTAL",
                        parseInt(response.headers["x-total-count"])
                    )
                    commit("SET_PRODUCTS", response.data);
                }).catch(error => {
                    window.console.log(error)
                })
        },
        getTestAllProduct({ commit }) {
            console.log('day la get test product')
            ProductService.getAllProducts().then(response => {
                commit("SET_TEST_ALLPRODUCTS", response)
            }).catch(error => {
                window.console.log(error)
            })
        }
    },
    modules: {

    },
    getters: {

    }
})