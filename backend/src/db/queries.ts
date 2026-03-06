import {db } from './index';
import { eq } from 'drizzle-orm';
import {users,comments, products, type NewUser, type NewComment, type NewProduct} from './schema'


// user queries
export const createUser = async (data:NewUser)=>{
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserbyId = async (id:string) =>{
  return db.query.users.findFirst({where: eq(users.id,id)});
};

export const updateUser = async(id:string,data:Partial<NewUser>) =>{
  // partial :  Partial มีไว้เพื่อบอก TypeScript ว่า "ข้อมูลที่ส่งมาใน Object นี้ จะมีแค่บางส่วน (Partial) ของ User ก็ได้นะ ไม่ต้องมาครบทุกฟิลด์"

  const [user] = await db.update(users).set(data).where(eq(users.id,id)).returning();
  return user;  
};

export const upsertUser = async(data:NewUser) =>{
  // upsert ถ้ามีตัวตนอยู่แล้วให้ update ถ้ายังไม่มีให้ create
 const existingUser =  await getUserbyId(data.id)
 if(existingUser) return updateUser(data.id,data)
  return createUser(data)
}


// product queries

export const createProduct = async (data:NewProduct)=>{
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async() =>{
  return db.query.products.findMany({
    with:{users:true},
    orderBy:(products,{desc})=>desc(products.createdAt)
  });

  // users -> true (join table another fk' table)
};

export const getProductById = async(id:string) =>{
   return db.query.products.findFirst({
    where: eq(products.id,id,),
    with:{
      users:true,
      comments:{
        with:{user:true}, // get user data 
        orderBy: (comments,{desc})=> [desc(comments.createdAt)]
      }
   }});    
};

export const getProductsByUserId = async(userId:string)=>{
  return db.query.products.findMany({
    where: eq(products.userId,userId,),
    orderBy: (product,{desc})=> [desc(product.createdAt)]
  });  
};


export const updateProduct = async(id:string,data:Partial<NewProduct>) =>{
   const [product] = await db.update(products).set(data).where(eq(products.id,id)).returning();
  return product;  
};

export const deleteProduct = async(id:string) =>{
  const [product] = await db.delete(products).where(eq(products.id,id)).returning();
  return product;
}

// comment queries

export const createComment= async (data:NewComment)=>{
  const [comment] = await db.insert(comments).values(data).returning();
  return comment;
};


export const getCommentById = async(id:string) =>{
   return db.query.comments.findFirst({
    where: eq(comments.id,id,),
    with:{
     user:true
   }});    
};
