import { Router } from 'express';
import { catchAsync } from '../middlewares/errors';
import TasksController from '../controllers/tasksController';

export default () => {
    const api = Router();

    // GET /task/:id
    api.get('/:id', catchAsync(TasksController.findOne))
    
    // GET /tasks
    api.get('/', catchAsync(TasksController.findAll))

    // POST /tasks
    api.post('/', catchAsync(TasksController.create))

    // PUT /tasks/:id
    api.put('/:id', catchAsync(TasksController.update))

    // DELETE /tasks/:id
    api.delete('/:id', catchAsync(TasksController.delete))

    return api;
}