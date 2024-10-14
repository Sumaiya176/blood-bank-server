import express from "express";
import { donorRequestControllers } from "./donorRequest.controller";

const router = express.Router();

router.post("/send-request", donorRequestControllers.createDonorRequest);
router.get(
  "/received-request",
  donorRequestControllers.getReceivedDonorRequest
);
router.patch(
  "/status-accepted",
  donorRequestControllers.updatePendingStatusToAccepted
);

export const donorRequestRouter = router;