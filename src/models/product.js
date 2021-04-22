const { text } = require('express');
const {Schema, model} = require('mongoose');

const ProductSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    ubication: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description:{
        type : String,
        require : true
    },
    user:{
        type : String,
        require : true
    }
  
}, { 
    timestamps : true
})

module.exports= model('product', ProductSchema)