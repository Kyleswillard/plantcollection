const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

export interface User {
    id: number
    userName: string
    password: string
    tokens: [token: String]
}

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    userName: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// userSchema.virtual('') // TODO: Set up local and foreignField for DB HERE!

userSchema.methods.generateAuth = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token: String })
    await user.save()
    return token
}
userSchema.statics.findByCreds = async (userName: Number, password: String) => {
    const user = await User.findOne({ userName: String })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
