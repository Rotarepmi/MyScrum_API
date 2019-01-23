import Project from '../models/project';

export default {
    async findOne(req, res, next) {
        const project = await Project.findOne({ _id: req.params.id });
        if(!project) return next();
        return res.status(200).send({ data: project });
    },
 
    async findAll(req, res) {
        const projects = await Project.find().sort({ createdAt: 'desc' });
        return res.status(200).send({ data: projects });
    },
 
    async create(req, res) {
        const project = await new Project({
            name: req.body.name,
            creator: req.body.creator,
            participants: []
        }).save();

        return res.status(201).send({ data: project, message: 'Project successfully created.'});
    },
 
    async update(req, res, next) {
        const project = await Project.findOne({ _id: req.params.id });
        if(!project) return next();

        Object.assign(project, req.body);
        await project.save();

        return res.status(200).send({ data: project, message: 'Project successfully updated.'});
    },
 
    async delete(req, res, next) {
        const project = await Project.findOne({ _id: req.params.id });
        if(!project) return next();

        await project.remove();

        return res.status(200).send({ data: project, message: 'Project successfully deleted.'});
    },
}