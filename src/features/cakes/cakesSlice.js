import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import get from "../../app/api-client";

const initialState = [
  { id: 1, name: 'haloween cake', comments: 'A nice cake', yumFactor: 2, imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-halloween-cake-horizontal-1539895591.jpg' },
  { id: 2, name: 'galaxy cake', comments: 'A very nice cake', yumFactor: 3, imageUrl: 'https://cdn.shopify.com/s/files/1/2725/9456/products/flavourtown-bakery-london-cakes_galaxy-cake_2048x2048.jpg' },
  { id: 3, name: 'kids cake', comments: 'A very very nice cake', yumFactor: 4, imageUrl: 'https://cakewhiz.com/wp-content/uploads/2020/02/Kids-Chocolate-Birthday-Cake-Recipe.jpg' },
  { id: 4, name: 'panda cake', comments: 'The best cake', yumFactor: 5, imageUrl: 'https://i.pinimg.com/736x/8f/9e/47/8f9e475511e703929d39853908fcde47.jpg' },
]

// export const fetchCakes = createAsyncThunk('repositories/fetchCakes', async () => {
//   const response = await get()
//   let items = response.data && response.data.items || []
//   return { ...items }
// })

export const cakesSlice = createSlice({
  name: 'cakes',
  initialState,
  reducers: {
    deleteCake: (state, action) => {
      const id = parseInt(action.payload)
      return state.filter(item => item.id !== id)
    },
    addCake: (state, action) => {
      const cake = {...action.payload, id: Math.floor(Math.random() * 100) + 10}
      state.push(cake)
    }
  },
  extraReducers: builder => {
    // builder.addCase(fetchCakes.fulfilled, (state, action) => state = action.payload)
  }
})

export const selectCakes = state => state.cakes
export const selectCakeById = id => state => {
  id = parseInt(id)
  return state.cakes.find(cake => cake.id === id)
}

export const { addCake, deleteCake } = cakesSlice.actions

export default cakesSlice.reducer
