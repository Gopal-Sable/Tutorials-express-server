import express from "express";
import {
    getAllTutorials,
    getTutorialById,
    createTutorial
} from "../controllers/tutorialController.js";
const router = express.Router();

router.get("/", getAllTutorials);
router.get("/:id", getTutorialById);
router.post("/",createTutorial)
export { router };
