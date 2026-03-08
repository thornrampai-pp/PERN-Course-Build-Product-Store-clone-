import type { Request, Response } from "express";
import * as querires from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await querires.getAllProducts();
    res.status(200).json({
      products
    });
  } catch (e) {
    console.error("Error getting product", e);
    res.status(500).json({
      error: "Faile to get Product",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await querires.getProductById(id);

    if (!product)
      return res.status(404).json({
        error: "Product not found",
      });
    res.status(200).json({
      data: product,
    });
  } catch (e) {
    console.error("Error getting product", e);
    res.status(500).json({
      error: "Faile to get Product",
    });
  }
};

export const getMyProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res.status(401).json({
        error: "Unauthorized",
      });

    const product = await querires.getProductsByUserId(userId);

    res.status(200).json({
      data: product,
    });
  } catch (e) {
    console.error("Error getting product", e);
    res.status(500).json({
      error: "Faile to get Product",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({
        error: "Unauthorized",
      });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      res.status(400).json({
        error: "Title, Description and ImageUrl are required",
      });
      return;
    }
    const product = await querires.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.error("Error to created product", e);
    res.status(500).json({
      success: false,
      error: "Faile to Create Product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return res.status(401).json({
        error: "Unauthorized",
      });
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await querires.getProductById(id);
    if (!existingProduct)
      return res.status(400).json({
        error: "Product not found",
      });

      if(existingProduct.userId !== userId){
         res.status(400).json({
          error: "Your can only update your own products",
        });
        return;
      }

      const product = await querires.updateProduct(id,{
        title,
        description,
        imageUrl
      });
      res.status(200).json({
        success: true,
        data: product
      });

  } catch (e) {
    console.error("Error to update product", e);
    res.status(500).json({
      success: false,
      error: "Faile to update Product",
    });
  }
};

export const deleteProduct = async(req:Request, res:Response) =>{
  try{
    const {userId} = getAuth(req);
    if (!userId)
      return res.status(401).json({
        error: "Unauthorized",
      });
    const {id} = req.params;

    const existingProduct = await querires.getProductById(id);
    if (!existingProduct)
      return res.status(400).json({
        error: "Product not found",
    });

    if (existingProduct.userId !== userId) {
      res.status(400).json({
        error: "Your can only delete your own products",
      });
      return;
    }

    const porduct = querires.deleteProduct(id);

    res.status(200).json({
      success: true,
      message: `Delet productId :${id} successfully`,
    })
    
    
  }catch(e){
    console.error("Error to delete product", e);
    res.status(500).json({
      success: false,
      error: "Faile to delete Product",
    });
  }
}
