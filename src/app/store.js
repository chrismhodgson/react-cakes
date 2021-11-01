import { configureStore } from '@reduxjs/toolkit'
import cakesReducer from '../features/cakes/cakesSlice'

export default configureStore({
  reducer: {
    cakes: cakesReducer
  }
})