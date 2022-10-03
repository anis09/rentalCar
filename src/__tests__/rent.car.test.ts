import supertest from 'supertest'
import {router} from '../../router'
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from 'mongoose';

export const carPayLoad={
  model: "tesla",
  registration: "445",
  mileAge: 4456,
}
beforeAll(async()=>{
  const mongoServer= await MongoMemoryServer.create()

  await mongoose.connect(mongoServer.getUri())
  
})

afterAll(async()=>{
  await mongoose.disconnect();
  await mongoose.connection.close();
})

describe("car", () => {

 

    describe("post carRented route", () => {
      describe("car does not exist",  () => {
  
        it("should return a 404", async ()=>{
            const registration='45569'
        
            await supertest(router).post(`/${registration}/rentals`).expect(404)
        });
       
      });
      describe("Car already rented",  () => {
  
        it("should return a 400", async ()=>{
            const registration='45569'
        
            await supertest(router).post(`/${registration}/rentals`).expect(400)
        });
       
      });
      describe("Car has been successfully rented",  () => {
  
        it("should return a 200", async ()=>{
          
            const registration='45569'
        
            await supertest(router).post(`cars/${registration}/rentals`).expect(200)
        });
       
      });
    });
  });