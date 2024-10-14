import express from "express";
import userController from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/active-users", auth(), userController.activeUsers);
router.get(
  "/users-with-donation-history",
  userController.usersWithDonationHistory
);
router.get("/single-user", userController.getSingleUser);
router.post("/user-registration", userController.createUser);
router.patch("/:id", userController.updateUser);
// router.get("/test", (req, res) => {
//   res.json({ message: "Server is working" });
// });

export const userRouter = router;
