import HRRequest from "./model/hrRequest.model.js";
import ApiError from "../../utils/ApiError.js";
import { updateUserHR } from "../auth/auth.service.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import type { Request } from "express";
import type { HRRequestStatus } from "./hr.types.js";
import HRBooking from "./model/hrBooking.model.js";


function checkStatus(status: HRRequestStatus) {
    if (status !== "pending" && status !== "approved") {
        throw ApiError.badRequest("Invalid status");
    }
}


export const checkHrRequest = async (userId: string) => {
    const hrRequest = await HRRequest.findOne({ userId });
    return hrRequest;
}


export const createHRRequest = async (userId: string) => {
    let check = await checkHrRequest(userId);
    if (check) {
        throw ApiError.badRequest("HR request already exists");
    }
    await HRRequest.create({ userId, status: "pending" });
}


export const deleteHRRequest = async (userId: string) => {
    if (!userId) {
        throw ApiError.badRequest("User ID is required");
    }
    let check = await checkHrRequest(userId);
    if (!check) {
        throw ApiError.notFound("HR request not found");
    }
    await HRRequest.deleteOne({ userId });
}





export const updateHRRequest = async (userId: string, status: HRRequestStatus) => {
    if (!userId) {
        throw ApiError.badRequest("User ID is required");
    }
    let check = await checkHrRequest(userId);
    if (!check) {
        throw ApiError.notFound("HR request not found");
    }
    checkStatus(status);
    let hrRequest = await HRRequest.updateOne({ userId }, { status });
    if (status === "approved") {
        await updateUserHR(userId);
    }
    return hrRequest;
}




export const getHrRequest = async (userId: string) => {
    const hrRequest = await checkHrRequest(userId);
    if (!hrRequest) {
        throw ApiError.notFound("HR request not found");
    }
    return hrRequest;
}




export const getAllHrRequests = async (req: Request) => {
    let query = HRRequest.find();
    let features = new ApiFeatures(query, req.query);
    features = features.filter().sort().limit().pagination();
    const hrRequests = await features.query;
    return hrRequests;
}





export const getAllHrs = async (req: Request) => {
    let query = HRRequest.find();
    let features = new ApiFeatures(query, req.query);
    features = features.filter().sort().limit().pagination();
    const hrRequests = await features.query;
    return hrRequests;
}



export const createHrBooking = async (userId: string, hrId: string) => {
    const check = await HRBooking.findOne({ userId, hrId });
    if (check) {
        throw ApiError.badRequest("HR booking already exists");
    }
    await HRBooking.create({ userId, hrId, status: "pending" });
}