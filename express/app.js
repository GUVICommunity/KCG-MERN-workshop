const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./todoModel');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect('mongodb://localhost:27017/tododb')
    .then(function () {
        console.log('connected to mongodb server');
    })
    .catch(function (error) {
        console.log('Error connecting to database');
        console.log(error);
    });

app.get('/', async function (req, res) {
    res.status(200).json({ message: 'hello world' });
});

app.post('/add-todo', async function (req, res) {
    try {
        const body = req.body;
        await new TodoModel(body).save();
        res.json({ message: 'added todo' });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

app.put('/update-todo', async function (req, res) {
    try {
        const body = req.body
        const id = body._id;
        
        const response = await TodoModel.updateOne({ _id: id }, body);

        if (response.nModified > 0) {
            res.json({ message: 'todo updated successfully', data: body });
            return;
        }
        res.json({ message: 'todo not updated' });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

app.get('/all-todos', async function (req, res) {
    try {
        const response = await TodoModel.find();
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});


app.get('/todo/:id', async function (req, res) {
    try {
        const id = req.params.id
        const response = await TodoModel.findOne({_id:id});
        res.json(response);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

app.listen(3000, function () {
    console.log('server listening on port :3000');
});
