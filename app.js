const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/todolist')
let db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function () {
    console.log("Connected to mongodb");
})

const Task = require('./models/Task');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
        const tasks = await Task.find();
        res.render('index', { tasks });
});

app.post('/tasks', async (req, res) => {
    const task = req.body.input;
    const todo = new Task({input: task, status: false}); 
    await todo.save();
    res.redirect('/')
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await Task.findById(id);
    todo.status = !todo.status;
    await todo.save();
    res.json({status: 'success'})
});

app.delete('/delete/:id', async (req, res) => {
    Task.deleteOne({_id:req.params.id})
    .then(() => {
    res.json({delete: 'success'});
    console.log('success')
    }).catch(error => {
        console.log(err)
    });
});

app.listen(8085, function () {
    console.log('Server started on port 8085...');
})