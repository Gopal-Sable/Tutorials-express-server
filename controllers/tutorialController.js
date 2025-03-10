import { Op } from "sequelize";
import Tutorials from "../models/Tutorials.js";

const sendError = (msg, status, next) => {
    const err = new Error(msg);
    err.status = status;
    next(err);
};

const getAllTutorials = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};

const getTutorialById = async (req, res, next) => {
    try {
        const tutorialId = req.params.id;
        if (isNaN(tutorialId)) {
            return sendError("ID should be number", 400, next);
        }
        const tutorials = await Tutorials.findOne({
            where: { id: tutorialId },
        });
        res.status(200).json(tutorials);
    } catch (error) {
        next(error);
    }
};

const createTutorial = async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.description) {
            return sendError("Please provide valid inputs", 400, next);
        }
        const tutorials = await Tutorials.create(req.body);
        res.status(200).json(tutorials);
    } catch (error) {
        next(error);
    }
};
const updateTutorial = async (req, res) => {
    try {
        const { title, description, published } = req.body;
        if (!req.body) {
            return sendError("Content can not be empty!", 400, next);
        }
        const tutorials = await Tutorials.update(
            { title, description, published },
            {
                where: { id: req.params.id },
            }
        );
        res.status(200).json(tutorials);
    } catch (error) {
        error.status = 500;
        next(error);
    }
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
