const express = require("express");
const router = express.Router();

const {
    addApplication,
    getApplications,
    getApplicationById,
    updateApplication,
    deleteApplication
} = require("../controllers/application.controller");

const protect = require("../middleware/authMiddleware");


router.post("/", protect, addApplication);
router.get("/stats", protect, getApplicationStats);
router.get("/", protect, getApplications);
router.get("/:id", protect, getApplicationById);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, deleteApplication);

module.exports = router;