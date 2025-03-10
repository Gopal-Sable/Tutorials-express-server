import { Router } from "express";
import {
    getAllTutorials,
    getTutorialById,
    createTutorial,
    updateTutorial,
    deleteById,
    deleteAll,
    getAllPublished,
} from "../controllers/tutorialsController.js";

const router = Router();

// Retrieve all published Tutorials
router.get("/published", getAllPublished);

// Retrieve all Tutorials
router.get("/", getAllTutorials);

// Retrieve a single Tutorial with id
router.get("/:id", getTutorialById);

// Create a new Tutorial
router.post("/", createTutorial);

// Update a Tutorial with id
router.put("/:id", updateTutorial);

// Delete a Tutorial with id
router.delete("/:id", deleteById);

// Delete all Tutorials
router.delete("/", deleteAll);
export { router };
