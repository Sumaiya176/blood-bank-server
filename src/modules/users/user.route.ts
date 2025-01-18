import express from "express";
import userController from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/active-users", userController.activeUsers);
router.get("/all-users", userController.allUsers);
router.get(
  "/users-with-donation-history",
  userController.usersWithDonationHistory
);
router.get("/single-user/:id", userController.getSingleUser);
router.post("/user-registration", userController.createUser);
router.patch("/:id", userController.updateUser);
//router.patch("/make-connection", auth(), userController.makeConnection);
router.patch("/make-connection/:id", auth(), userController.makeConnection);
router.get("/my-posts", auth(), userController.getMyPost);
router.get("/requested-donor/:id", auth(), userController.getRequestedDonor);
router.get("/my-donation-history", auth(), userController.getMyDonationHistory);
router.get("/connected-users", auth(), userController.connectedUsers);
router.patch("/point-reduction/:name", auth(), userController.pointReduction);

// router.get("/test", (req, res) => {
//   res.json({ message: "Server is working" });
// });

export const userRouter = router;
