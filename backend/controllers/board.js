const Board = require("../models/board");

const saveTask = async (req, res) => {
    if(!req.body.name || !req.body.description) 
        return res.status(401).send("Process Failed: Incomplete Data");

    const board = new Board({
        userId: req.body.userId,
        name: req.body.name,
        description: req.body.description,
        taskStatus: "to-do",
        imageUrl: "",
    });

    const result = await board.save();
    if(!result) return res.status(400).send("Process Failed: Failed to register task");
    return res.status(200).send({ result });
};



module.exports = { saveTask };