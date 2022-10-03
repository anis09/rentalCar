import  request  from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { router } from "../../router";


export const carTest={
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


it('should create a car ',async()=>{
    const response =await request(router).post('/create').send(carTest);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({...carTest});
  })