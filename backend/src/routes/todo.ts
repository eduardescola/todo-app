import express from 'express';
import Todo from '../models/todo';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      text,
      priority: Math.floor(Math.random() * 10), // Prioridad aleatoria
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/:id/edit', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
