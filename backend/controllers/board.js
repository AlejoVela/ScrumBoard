const Board = require("../models/board");
const mongoose = require("mongoose");

const saveTask = async (req, res) => {
    if (!req.body.name || !req.body.description)
        return res.status(401).send("Process Failed: Incomplete Data");

    const board = new Board({
        userId: req.user._id,
        name: req.body.name,
        description: req.body.description,
        taskStatus: "to-do",
    });

    const result = await board.save();
    if (!result)
        return res.status(400).send("Process Failed: Failed to register task");
    return res.status(201).send({ result });
};

const listTasks = async (req, res) => {
    const board = await Board.find({ userId: req.user._id });
    if (!board || board.length === 0)
        return res.status(400).send("Process Failed: No task to list");
    return res.status(200).send({ board });
};

const updateTask = async (req, res) => {
    if (
        !req.body._id ||
        !req.body.name ||
        !req.body.taskStatus ||
        !req.body.description
    )
        return res.status(400).send("Process Failed: Incomplete Data");

    let board = await Board.findByIdAndUpdate(
        req.body._id,
        {
            userId: req.user._id,
            name: req.body.name,
            description: req.body.description,
            taskStatus: req.body.taskStatus,
        }    
    );

    if(!board) return res.status(400).send("Process Failed: Task no found")

    return res.status(200).send({ board });
};

const deleteTask = async (req, res) => {
    //validar si el id es valido
    const validId = mongoose.Types.ObjectId.isValid(req.params._id);
    if (!validId) return res.status(400).send("Process Failed: Invalid Id");

    const board = await Board.findByIdAndDelete(req.params._id); //req.params["_id"] //este solo lo usamos cuando llegan varios objetos por la url
    if (!board) return res.status(400).send("Process Failed: Tasks no found");
    return res.status(200).send("Task deleted");
};

module.exports = { saveTask, listTasks, updateTask, deleteTask };
