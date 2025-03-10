import { Router } from "express";
import {
    getAllTutorials,
    getTutorialById,
    createTutorial,
    updateTutorial,
    deleteById,
    deleteAll,
    getAllPublished,
} from "../controllers/tutorialController.js";

const router = Router();

router.get("/published", getAllPublished);
router.get("/", getAllTutorials);
router.get("/:id", getTutorialById);
router.post("/", createTutorial);
router.put("/:id", updateTutorial);
router.delete("/:id", deleteById);
router.delete("/", deleteAll);
export { router };
