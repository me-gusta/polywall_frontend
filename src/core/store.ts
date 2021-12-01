import { configureStore } from '@reduxjs/toolkit'
import editorReduser from './slices/editorSlice'


export default configureStore({
    reducer: editorReduser,
})