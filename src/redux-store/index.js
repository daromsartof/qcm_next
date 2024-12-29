// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: {
    counter: (state = 0, action) => state + action.payload},
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})
