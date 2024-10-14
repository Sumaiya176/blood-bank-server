import express from "express";
import { bloodPostControllers } from "./bloodPost.controller";

const router = express.Router();

router.get("/", bloodPostControllers.getAllBloodPosts);
router.post("/create-post", bloodPostControllers.createBloodPost);
router.patch("/:id", bloodPostControllers.updateBloodPost);
router.patch(
  "/create-donation-history/:id",
  bloodPostControllers.createDonationHistory
);

export const bloodPostRouter = router;
