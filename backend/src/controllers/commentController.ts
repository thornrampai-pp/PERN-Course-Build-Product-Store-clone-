import type { Request, Response } from "express";
import * as querires from "../db/queries";
import { getAuth } from "@clerk/express";


export const crateCommet = async(req:Request, res:Response) =>{
  try{
    const {userId} = getAuth(req);
    if(!userId) return res.status(401).json({
      error: "Unauthorized"
    });

    const {productId} = req.params;
    const {content} = req.body;

    if(!content) return res.status(400).json({
      error: "Comment content is required"
    });
    // เช็คว่ามี product 
    const product = await querires.getProductById(productId);
    if(!product) return res.status(400).json({
      error: "Product not found"
    });

    const comment = await querires.createComment({
      content,
      userId,
      productId
    });
    res.status(200).json({
      sucess: true,
      data: comment,
    })

  }catch(e){
    console.error("Error to create comment",e);
    res.status(500).json({
      error: "Failed to create comment"
    })
  }
}


export const deleteCommet = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({
      error: "Unauthorized"
    });
    const {commentId} = req.params;
    const existingComment = await querires.getCommentById(commentId);
    if(!existingComment) return res.status(400).json({
      error: "Comment not found"
    });

    if(existingComment.id !== userId){
      return res.status(403).json({
        error: "You can only delet your own comments"
      })
    }

    await querires.deleteProduct(commentId);
    res.status(200).json({
      sucess: true,
      message: "Comment deleted successfully"
    });

  } catch (e) {
    console.error("Error to deleted comment", e);
    res.status(500).json({
      error: "Failed to deleted comment"
    })
  }
}