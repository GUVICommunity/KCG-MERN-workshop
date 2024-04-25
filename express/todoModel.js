const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
	todo: String,
	completed: {type: Boolean, default:false},
	createdAt: {type:Number, default:Date.now}
})

const TodoModel =  mongoose.model('todos',todoSchema)
module.exports = TodoModel
