import Tutorials from "../models/Tutorials.js";

const getAllTutorials = async (req, res) => {
    const tutorials = await Tutorials.findAll();
    res.status(200).json(tutorials);
};

const getTutorialById = async (req, res) => {
    const tutorials = await Tutorials.findOne({ where: { id: req.params.id } });
    res.status(200).json(tutorials);
};

const createTutorial = async (req, res) => {
    const tutorials = await Tutorials.create(req.body);
    res.status(200).json(tutorials);
};
export { getAllTutorials, getTutorialById, createTutorial };
