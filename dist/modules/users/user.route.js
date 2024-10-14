"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/active-users", (0, auth_1.default)(), user_controller_1.default.activeUsers);
router.get("/users-with-donation-history", user_controller_1.default.usersWithDonationHistory);
router.get("/single-user", user_controller_1.default.getSingleUser);
router.post("/user-registration", user_controller_1.default.createUser);
router.patch("/:id", user_controller_1.default.updateUser);
// router.get("/test", (req, res) => {
//   res.json({ message: "Server is working" });
// });
exports.userRouter = router;
