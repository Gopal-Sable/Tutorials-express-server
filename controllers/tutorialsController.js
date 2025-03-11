import openDb from "../db/config.js";

const db = await openDb();

//  Helper function for error handling
const sendError = (msg, status, next) => {
    const err = new Error(msg);
    err.status = status;
    next(err);
};

//  Gives all Tutorials or queried title
const getAllTutorials = (req, res, next) => {
    if (req.query.title) {
        db.all(
            `SELECT * FROM tutorials where title like '%${req.query.title}%'`
        )
            .then((tutorials) => res.status(200).json(tutorials))
            .catch(next);
        return;
    }
    db.all("SELECT * FROM tutorials;")
        .then((tutorials) => res.status(200).json(tutorials))
        .catch(next);
};

//  Gives data of given Id
const getTutorialById = (req, res, next) => {
    const tutorialId = req.params.id;
    if (isNaN(tutorialId)) {
        return sendError("ID should be number", 400, next);
    }
    db.get("select * from tutorials where id=?", [tutorialId])
        .then((tutorials) => {
            if (!tutorials) {
                return sendError("ID not found", 404, next);
            }
            return res.status(200).json(tutorials);
        })
        .catch(next);
};

// Creates New Tutorial
const createTutorial = (req, res, next) => {
    if (!req.body.title || !req.body.description) {
        return sendError("Please provide valid inputs", 400, next);
    }
    db.run("INSERT INTO tutorials(title,description,published) VALUES(?,?,?)", [
        req.body.title,
        req.body.description,
        req.body.published || 0,
    ])
        .then((tutorials) => {
            return res.status(201).json({
                status: "Tutorial added",
                ID: tutorials.lastID,
            });
        })
        .catch(next);
};

// Updates Tutorial
const updateTutorial = (req, res, next) => {
    const tutorialId = req.params.id;
    const { title, description, published } = req.body;
    if (!title || !description || !published) {
        return sendError("Content can not be empty!", 400, next);
    }
    if (!tutorialId || isNaN(tutorialId)) {
        return sendError("Provide id", 400, next);
    }
    db.run(
        "UPDATE tutorials SET title=?,description=?,published=? WHERE id=?",
        [title, description, published, tutorialId]
    )
        .then((tutorials) => {
            if (tutorials.changes < 1) {
                return sendError("Id not found", 404, next);
            }
            return res
                .status(200)
                .json({ Message: "Tutorial updated successfully" });
        })
        .catch((error) => {
            error.status = 500;
            next(error);
        });
};

// Delete tutorial of given ID
const deleteById = (req, res, next) => {
    const tutorialId = req.params.id;
    if (!tutorialId || isNaN(tutorialId)) {
        return sendError("Provide id", 400, next);
    }
    db.run("DELETE FROM tutorials WHERE id=?", [tutorialId])
        .then((tutorials) => {
            if (tutorials.changes < 1) {
                return sendError("Id not found", 404, next);
            }
            return res
                .status(200)
                .json({ Message: "Tutorial deleted successfully" });
        })
        .catch(next);
};

// Deletes all tutorials
const deleteAll = (req, res, next) => {
    db.run("DELETE FROM tutorials")
        .then((tutorials) => {
            if (tutorials.changes < 1) {
                return sendError("No tutorial found for delete", 404, next);
            }
            return res
                .status(200)
                .json({ Message: "Tutorials deleted successfully" });
        })
        .catch(next);
};

//  Gives all published tutorials
const getAllPublished = (req, res, next) => {
    db.all("SELECT * FROM tutorials WHERE published=?", [1])
        .then((tutorials) => res.status(200).json(tutorials))
        .catch(next);
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
