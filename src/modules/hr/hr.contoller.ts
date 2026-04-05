import type { Request, Response, NextFunction } from "express";
import * as hrService from "./hr.service.js";

export const getHRRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrRequest = await hrService.getHrRequest(req.user!.userId);
        res.status(200).json({ success: true, data: hrRequest });
    } catch (error) {
        next(error);
    }
}


export const createHRRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrRequest = await hrService.createHRRequest(req.user!.userId);
        res.status(200).json({ success: true, data: hrRequest });
    } catch (error) {
        next(error);
    }
}



export const deleteHRRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await hrService.deleteHRRequest(req.user!.userId);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}


export const updateHRRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrRequest = await hrService.updateHRRequest(req.params.id as string, req.body.status);
        res.status(200).json({ success: true, data: hrRequest });
    } catch (error) {
        next(error);
    }
}



export const getAllHrRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrRequests = await hrService.getAllHrRequests(req);
        res.status(200).json({ success: true, data: hrRequests });
    } catch (error) {
        next(error);
    }
}

export const getAllHrs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrs = await hrService.getAllHrs(req);
        res.status(200).json({ success: true, data: hrs });
    } catch (error) {
        next(error);
    }
}


export const getHrBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrBookings = await hrService.getHrBookings(req.user!.userId);
        res.status(200).json({ success: true, data: hrBookings });
    } catch (error) {
        next(error);
    }
}

export const updateHrBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrBooking = await hrService.updateHrBookingStatus(req.params.id as string, req.body.status, req.user!.userId);
        res.status(200).json({ success: true, data: hrBooking });
    } catch (error) {
        next(error);
    }
}

export const createHrBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hrBooking = await hrService.createHrBooking(req.user!.userId, req.body);
        res.status(200).json({ success: true, data: hrBooking });
    } catch (error) {
        next(error);
    }
}