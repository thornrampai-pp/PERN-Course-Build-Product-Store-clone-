import type { Request, Response } from "express";
import * as querires from '../db/queries';
import { getAuth } from "@clerk/express";

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({
      error: "Unauthorized"
    });
    const { email, name, imageUrl } = req.body;
    if (!email || !name || !imageUrl) {
      return res.status(400).json({
        error: "Email, Name and imageUrl are required"
      });
    }
    const user = await querires.upsertUser({
      id:userId,
      email: email,
      name: name,
      imageUrl: imageUrl
    });
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to saync user"
    });
  }
}