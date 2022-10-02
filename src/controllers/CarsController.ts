import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Car from "../models/CarModel";

/**
 * @description add new car
 *
 * @param {Request} req request
 * @param {Response} res response
 *
 * @returns {Response} endpoint response
 */
const addCar = async (req: Request, res: Response) => {
  const { model, registration, mileAge } = req.body;
  if (!model) {
    return res.status(400).json({ message: "Please specify car model" });
  }
  if (!registration) {
    return res.status(400).json({ message: "Please specify car registration" });
  }
  const car = new Car({
    model,
    registration,
    mileAge,
  });
  const exist = await Car.findOne({ registration });
  if (exist) {
    return res.status(400).json({ message: "Car already exist" });
  }
  return car
    .save()
    .then((result) =>
      res.status(201).json({
        message: `Car ${result.model} has been added successfully`,
        carId: result._id,
      })
    )
    .catch((error) => res.status(500).json(error));
};

/**
 *
 * @description get all cars
 *
 * @param {Request} req request
 * @param {Response} res response
 *
 * @returns {Response} endpoint response
 */
const getCars = (req: Request, res: Response) => {
  return Car.find()
    .then((cars) =>
      res.status(200).json(
        cars.map((car) => ({
          model: car.model,
          registration: car.registration,
          mileAge: car.mileAge,
          rentalStatus: car.rentalStatus,
        }))
      )
    )
    .catch((error) => res.status(500).json({ error }));
};
/**
 * 
 * @description update rentatCar status
 *
 * @param {Request} req request
 * @param {Response} res response
 *
 * @returns {Response} endpoint response
 */
const UpdateRentalCar = async (req: Request, res: Response) => {
  const registration = req.params.registration;
  if (!registration) {
    return res.status(400).json({ message: "Please specify car registration" });
  }
  const existingCar = await Car.findOne({ registration });
  if (!existingCar) {
    return res.status(400).json({ message: "Car doesn't exist" });
  }
  if (existingCar.rentalStatus) {
    return res.status(400).json({ message: "Car already rented" });
  }
  return Car.updateOne({ registration }, { $set: { rentalStatus: true } })
    .then(() =>
      res.status(200).json({ message: "Car has been successfully rented" })
    )
    .catch((error) => res.status(500).json({ error }));
};
/**
 * 
 * @description return a car 
 *
 * @param {Request} req request
 * @param {Response} res response
 *
 * @returns {Response} endpoint response
 */
const ReturnRentalCar = async (req: Request, res: Response) => {
  const registration = req.params.registration;
  if (!registration) {
    return res.status(400).json({ message: "Please specify car registration" });
  }
  const existingCar = await Car.findOne({ registration });
  if (!existingCar) {
    return res.status(400).json({ message: "Car doesn't exist" });
  }
  if (existingCar.rentalStatus) {
    const kilos = parseInt(req.body.kilos);
    if (!kilos) {
      return res.status(400).json({ message: "Please specify car kilometers" });
    }
    return Car.updateOne(
      { registration },
      { $set: { mileAge: existingCar.mileAge + kilos, rentalStatus: false } }
    )
      .then(() =>
        res.status(200).json({ message: "Car has been successfully returned" })
      )
      .catch((error) => res.status(500).json({ error }));
  }
  return res.status(400).json({ message: "Car is already available" });
};
export default { addCar, getCars, UpdateRentalCar, ReturnRentalCar };
