const mongoose = require('mongoose')
export interface Plant {
    id: number | null
    nickName: string
    species: string
    h2oFrequency: number
}

const plantSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    nickName: {
        type: String,
        required: true,
        trim: true
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    h2oFrequency: {
        type: Number,
        required: false,
        trim: true
    }
})
