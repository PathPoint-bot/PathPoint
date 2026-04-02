







export type HRRequestStatus = "pending" | "approved";




export interface IHRRequest {
    userId: string;
    type: string;
    status: HRRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}



export interface IHrBooking  {
    userId : string;
    hrId: string;
    status: "pending" | "approved";
    createdAt: Date;
    updatedAt: Date;
}
