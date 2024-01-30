import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      state.name = "park";
    },

    //state  변경함수를   action이라고 함
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

//   increase(10)
//   increase(100)

export let { changeName, increase } = user.actions;

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, imgurl: "shoes1.jpg", name: "White and Black", count: 2 },
    { id: 1, imgurl: "shoes2.jpg", name: "Red Knit", count: 1 },
    { id: 2, imgurl: "shoes3.jpg", name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      console.log(num);
      console.log("내가 선택한 상품" + action.payload);
      console.log("내가 추가한 상품아이디는" + state[num].id);
      console.log("내가 추가한 상품갯수는" + state[num].count);

      state[num].count++;
    },
    decreaseCount(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      console.log(num);
      if (state[num].count > 0) {
        state[num].count--;
      } else if (state[num].count === 0) {
        alert("상품이 더 이상 없습니다.");
      }
    },
    addItem(state, action) {
      let num = state.findIndex((a) => a.id === action.payload.id);
      if (num !== -1) {
        state[num].count++;
      } else {
        state.push(action.payload);
      }
    },

    deleteItem(state, action) {
      let num = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state.splice(num, 1);
    },
    sortName(state, action) {
      state.sort((a, b) => (a.title > b.title ? 1 : -1));
    },
  },
});

// addCount(1)

export let { addCount, decreaseCount, addItem, deleteItem, sortName } =
  cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
