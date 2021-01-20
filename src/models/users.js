const Mongoose = require('mongoose')


const schema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: true},
    toJson: {
        virtuals: true,
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false
})

const UsersModel = Mongoose.model('users', schema)

module.exports = UsersModel