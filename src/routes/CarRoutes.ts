import express from "express";
import controller from "../controllers/CarsController";

const router = express.Router();

router.post("/create", controller.addCar);
router.get("/list", controller.getCars);
router.post("/:registration/rentals", controller.UpdateRentalCar);
router.post("/:registration/returns", controller.ReturnRentalCar);

export = router;
