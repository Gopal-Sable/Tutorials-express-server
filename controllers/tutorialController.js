import { Op } from "sequelize";
import Tutorials from "../models/Tutorials.js";

const getAllTutorials = async (req, res) => {
    if (req.query.title) {
        const tutorials = await Tutorials.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.title}%`,
                },
            },
        });
        res.status(200).json(tutorials);
        return;
    }
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
const updateTutorial = async (req, res) => {
    const { title, description, published } = req.body;
    const tutorials = await Tutorials.update(
        { title, description, published },
        {
            where: { id: req.params.id },
        }
    );
    res.status(200).json(tutorials);
};

const deleteById = async (req, res) => {
    const tutorials = await Tutorials.destroy({
        where: { id: req.params.id },
    });
    res.status(200).json(tutorials);
};
const deleteAll = async (req, res) => {
    const tutorials = await Tutorials.destroy({
        truncate: true,
    });
    res.status(200).json(tutorials);
};

const getAllPublished = async (req, res) => {
    console.log("iam hit");

    const tutorials = await Tutorials.findAll({ where: { published: true } });

    res.status(200).json(tutorials);
};
export {
    getAllTutorials,
    getTutorialById,
    createTutorial,
    updateTutorial,
    deleteById,
    deleteAll,
    getAllPublished,
};
