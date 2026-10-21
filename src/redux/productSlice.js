import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../api";

const initialState={
    products:[],
    product:null,
    loading:false,
    error:null
}

export const getProduct=createAsyncThunk('product/getProduct',async()=>{
    const response=await api.get('/products/')
    return response.data.products
})

export const addProduct=createAsyncThunk('product/addProduct',async(product,{rejectWithValue})=>{
  try {
    const response=await api.post('/products/add',product)
    return response.data.newProduct
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message)
  }
})

export const getProductById=createAsyncThunk('product/getProductById',async(id)=>{
    const response=await api.get(`/products/${id}`)
    return response.data?.product || response.data || null
})

export const deleteProduct=createAsyncThunk('/product/deleteProduct',async(id)=>{
    await api.delete(`/products/${id}`)
    return id
})

export const updateProduct=createAsyncThunk('/product/updateProduct',async({id, product, image})=>{
const formData = new FormData()
Object.entries(product).forEach(([key, value]) => formData.append(key, value))
if (image) {
    formData.append('image', image)
}
const response=await api.put(`/products/${id}`,formData)
return response.data.updatedProduct
})

const productSlice=createSlice({
    name:'product',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
       builder
       .addCase(getProduct.pending,(state)=>{
          state.loading=true
          state.error=null
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.products=action.payload
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
        .addCase(addProduct.pending,(state)=>{
             state.loading=true
             state.error=null
        })
         .addCase(addProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.products.push(action.payload)
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.payload || action.error.message
        })
        .addCase(getProductById.pending,(state)=>{
             state.loading=true
             state.error=null
             state.product=null
        })
         .addCase(getProductById.fulfilled,(state,action)=>{
            state.loading=false,
            state.product=action.payload
        })
        .addCase(getProductById.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
          .addCase(deleteProduct.pending,(state)=>{
             state.loading=true
        })
         .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.products=state.products.filter((v)=>v._id!=action.payload)
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
         .addCase(updateProduct.pending,(state)=>{
             state.loading=true
        })
         .addCase(updateProduct.fulfilled,(state,action)=>{
            state.loading=false
            const index=state.products.findIndex(v=>v._id==action.payload._id)
            state.products[index]=action.payload
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default productSlice.reducer