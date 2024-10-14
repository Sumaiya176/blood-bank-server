"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodPostControllers = void 0;
const bloodPost_service_1 = __importDefault(require("./bloodPost.service"));
const sendResponse_1 = require("../../util/sendResponse");
const getAllBloodPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bloodPost_service_1.default.getAllBloodPosts();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Got all blood event posts successfully",
        data: result,
    });
});
const createBloodPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bloodPost } = req.body;
    const result = yield bloodPost_service_1.default.bloodPostSendToDatabase(bloodPost);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Blood event posted successfully",
        data: result,
    });
});
const updateBloodPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("err");
    try {
        const { id } = req.params;
        const { bloodPost } = req.body;
        console.log(id, bloodPost);
        const result = yield bloodPost_service_1.default.updateBloodPostToDatabase(id, bloodPost);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Blood event post updated successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
const createDonationHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { postId } = req.body;
    // console.log(id, req.body);
    const result = yield bloodPost_service_1.default.saveDonationHistoryIntoDb(id, postId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Blood event accepted successfully",
        data: result,
    });
});
exports.bloodPostControllers = {
    createBloodPost,
    updateBloodPost,
    getAllBloodPosts,
    createDonationHistory,
};
