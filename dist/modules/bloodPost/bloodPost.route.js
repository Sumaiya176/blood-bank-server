"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodPostRouter = void 0;
const express_1 = __importDefault(require("express"));
const bloodPost_controller_1 = require("./bloodPost.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", bloodPost_controller_1.bloodPostControllers.getAllBloodPosts);
router.get("/single-post/:id", (0, auth_1.default)(), bloodPost_controller_1.bloodPostControllers.getSingleBloodPosts);
router.post("/create-post", (0, auth_1.default)(), bloodPost_controller_1.bloodPostControllers.createBloodPost);
router.patch("/:id", bloodPost_controller_1.bloodPostControllers.updateBloodPost);
router.patch("/create-donation-history/:id", bloodPost_controller_1.bloodPostControllers.createDonationHistory);
router.patch("/update-post-status/:id", bloodPost_controller_1.bloodPostControllers.updatePostStatus);
router.patch("/create-donation-cancel-history/:id", bloodPost_controller_1.bloodPostControllers.createDonationCancelHistory);
router.delete("/delete-blood-post/:id", bloodPost_controller_1.bloodPostControllers.deleteBloodPost);
router.patch("/cancel-requested-donor/:id", bloodPost_controller_1.bloodPostControllers.cancelRequestedDonor);
router.patch("/due-requested-donor/:id", bloodPost_controller_1.bloodPostControllers.dueRequestedDonor);
router.patch("/donated-requested-donor/:id", bloodPost_controller_1.bloodPostControllers.donatedRequestedDonor);
exports.bloodPostRouter = router;
