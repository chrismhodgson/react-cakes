import { get, post, del } from "../../app/api-client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = { status: 'idle', items: [], pages: 0, error: null }

export const fetchCakes = createAsyncThunk('repositories/fetchCakes', async (page = 0) => {
  const response = await get(`?page=${page}&limit=5`)
  console.log(response.data.meta, 'fetchCakes meta')
  return response.data
})
export const deleteCake = createAsyncThunk('repositories/deleteCake', async (id) => {
  const response = await del(id)
  return response.data
})
export const addCake = createAsyncThunk('repositories/addCake', async (cake) => {
  const response = await post(cake)
  return response.data
})

export const cakesSlice = createSlice({
  name: 'cakes',
  initialState,
  reducers: {
    // example: (state, action) => {}
  },
  extraReducers: builder => {
    builder
      // fetchCakes
      .addCase(fetchCakes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload.items.length !== 0) {
          state.pages = action.payload.meta.totalPages
          //state.items.push(...action.payload.items)
          state.items = action.payload.items
        }
      })
      .addCase(fetchCakes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // deleteCake
      .addCase(deleteCake.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(deleteCake.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.filter(item => item._id !== action.payload)
      })
      .addCase(deleteCake.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // addCake
      .addCase(addCake.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addCake.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.push(action.payload)
      })
      .addCase(addCake.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectCakeById = id => state => {
  return state?.cakes?.items.find(cake => cake._id === id)
}
// export const { example } = cakesSlice.actions

export default cakesSlice.reducer
