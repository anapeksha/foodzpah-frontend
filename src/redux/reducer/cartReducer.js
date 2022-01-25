import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			if (typeof window !== undefined) {
				var found = false;
				state.products.find((product) => {
					if (product._id === action.payload._id) {
						product.count += 1;
						found = true;
					}
				});
				if (found === false) {
					state.products.push({
						...action.payload,
						count: 1,
					});
				}
			}
		},
		removeFromCart: (state, action) => {
			if (typeof window !== undefined) {
				state.products.map((product, i) => {
					if ( product._id === action.payload._id ) {
						if (product.count !== undefined) {
							state.products.splice(i, 1);
						}
						
					}
				});
			}
		},
		cartEmpty: (state) => {
			if (typeof window !== undefined) {
				state.products = [];
			}
		},
		incrementQty: ( state, action ) => {
			if ( typeof window !== undefined ) {
				state.products.map((product,i) => {
					if (product._id === action.payload._id && product.count !== undefined) {
						product.count+=1;
					}
				});
			}
		},
		decrementQty: ( state, action ) => {
			if ( typeof window !== undefined ) {
				state.products.map((product,i) => {
					if (product._id === action.payload._id && product.count !== undefined) {
						if ( product.count >= 2 ) {
							product.count -= 1;
						}
						else if ( product.count <= 1 ) {
							state.products.splice(i, 1);
						}
					}
				});
			}
		}
	},
});

export const { addToCart, removeFromCart, cartEmpty, incrementQty, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;

