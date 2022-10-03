import  request  from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { router } from "../../router";


beforeAll(async()=>{
    const mongoServer= await MongoMemoryServer.create()
  
    await mongoose.connect(mongoServer.getUri())
    
  })
  
  afterAll(async()=>{
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  it('should be users initially',async()=>{
    const response=await request(router).get('/list');
    
  })
 