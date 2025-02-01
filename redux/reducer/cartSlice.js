import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState = {
  items: [
    {
      id: 1,
      title: "Natural bone straight weavons",
      category: "weavons",
      price: 124500,
      colors: [
        { code: "#a39d87", name: "T16/02" },
        { code: "#cc9735", name: "T27/13" },
        { code: "#090304", name: "T04/16" },
        { code: "#e8f9dd", name: "T34/15" },
        { code: "#89da7d", name: "T03/24" },
        { code: "#2ef4ac", name: "T07/01" },
      ],
      lengths: [
        { length: `10"`, charge: 0 },
        { length: `12"`, charge: 10500 },
        { length: `16"`, charge: 14000 },
      ],
      choice: {
        selectedColor: { code: "#cc9735", name: "T27/13" },
        selectedLength: { length: `10"`, charge: 0 },
        quantity: 1,
        totalPrice: 124500,
      },
    },
    {
      id: 2,
      title: "Smooth curly fully packed wig",
      category: "wigs",
      price: 21000,
      colors: [
        { code: "#acdefb", name: "T23/03" },
        { code: "#999223", name: "T01/06" },
        { code: "#234321", name: "T17/21" },
        { code: "#accdde", name: "T24/27" },
        { code: "#123456", name: "T00/09" },
        { code: "#765432", name: "T11/26" },
      ],
      lengths: [
        { length: `10"`, charge: 0 },
        { length: `12"`, charge: 15000 },
        { length: `20"`, charge: 24000 },
      ],
      choice: {
        selectedColor: { code: "#234321", name: "T17/21" },
        selectedLength: { length: `10"`, charge: 0 },
        quantity: 1,
        totalPrice: 21000,
      },
    },
  ], // Array of cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_ITEM_TO_CART: (state, action) => {
      const { product, quantity, selectedColor, selectedLength } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (!existingItem) {
        state.items.push({
          ...product,
          choice: {
            selectedColor,
            selectedLength,
            quantity,
            totalPrice: product.price,
          },
        });
      }

      //show removal alert
      Toast.show({
        type: "success",
        text1: "Cart Updated",
        text2: "An item was added to your cart",
      });
    },
    REMOVE_ITEM_FROM_CART: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.items = state.items.filter((item) => item.id !== id);
      }

      //show removal alert
      Toast.show({
        type: "pending",
        text1: "Cart Updated",
        text2: "An item was removed from your cart",
      });
    },
    UPDATE_CART_ITEM_QUANTITY: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.choice.quantity = quantity;

        //check for additional charge from length
        let extraCharge = 0;

        if (existingItem.choice.selectedLength) {
          extraCharge = existingItem.choice.selectedLength?.charge;
        }

        //sum up every variable
        existingItem.choice.totalPrice =
          quantity * (existingItem.price + extraCharge);
      }
    },
    UPDATE_CART_ITEM_COLOR: (state, action) => {
      const { id, color } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.choice.selectedColor = color;
      }
    },
    UPDATE_CART_ITEM_LENGTH: (state, action) => {
      const { id, length } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.choice.selectedLength = length;

        //check quantity and extra charge
        let extraCharge = length?.charge;

        //sum up every variable
        existingItem.choice.totalPrice =
          existingItem.choice.quantity * (existingItem.price + extraCharge);
      }
    },
  },
});

export const {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_CART_ITEM_COLOR,
  UPDATE_CART_ITEM_LENGTH,
} = cartSlice.actions;
export default cartSlice;
