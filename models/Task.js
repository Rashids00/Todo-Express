const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  input: String,
  status: Boolean
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;