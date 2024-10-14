"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodPostRouter = void 0;
const express_1 = __importDefault(require("express"));
const bloodPost_controller_1 = require("./bloodPost.controller");
const router = express_1.default.Router();
router.get("/", bloodPost_controller_1.bloodPostControllers.getAllBloodPosts);
router.post("/create-post", bloodPost_controller_1.bloodPostControllers.createBloodPost);
router.patch("/:id", bloodPost_controller_1.bloodPostControllers.updateBloodPost);
router.patch("/create-donation-history/:id", bloodPost_controller_1.bloodPostControllers.createDonationHistory);
exports.bloodPostRouter = router;
