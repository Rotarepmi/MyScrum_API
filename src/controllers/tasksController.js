import Task from '../models/tasks';

export default {
    async findOne(req, res, next) {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) return next();
        return res.status(200).send({ data: task });
    },

    async findAll(req, res) {
        const tasks = await Task.find({ "project.id": req.body.project.id }).sort({ createdAt: 'desc' });

        return res.status(200).send({ data: tasks });
    },

    async create(req, res) {
        const task = await new Task({
            name: req.body.name,
            description: req.body.description,
            creator: req.body.creator,
            status: req.body.status,
            project: req.body.project,
            users: req.body.users
        }).save();

        return res.status(201).send({ data: task, message: 'Task successfully created.' });
    },

    async update(req, res, next) {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) return next();

        Object.assign(task, req.body);
        await task.save();

        return res.status(200).send({ data: task, message: 'Task successfully updated.' });
    },

    async delete(req, res, next) {
        const task = await Task.findOne({ _id: req.params.id });
        if (!task) return next();

        return res.status(200).send({ data: task, message: 'Task successfully deleted.' });
    },
}