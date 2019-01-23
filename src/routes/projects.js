import { Router } from 'express';
import { catchAsync } from '../middlewares/errors';
import ProjectsController from '../controllers/projectsController';

export default () => {
    const api = Router();

    // GET /project/:id
    api.get('/:id', catchAsync(ProjectsController.findOne))
    
    // GET /projects
    api.get('/', catchAsync(ProjectsController.findAll))

    // POST /projects
    api.post('/', catchAsync(ProjectsController.create))

    // PUT /projects/:id
    api.put('/:id', catchAsync(ProjectsController.update))

    // DELETE /projects/:id
    api.delete('/:id', catchAsync(ProjectsController.delete))

    return api;
}