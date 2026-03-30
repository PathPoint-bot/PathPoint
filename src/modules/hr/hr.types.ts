







export type HRRequestStatus = "pending" | "approved";




export interface IHRRequest {
    userId: string;
    type: string;
    status: HRRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}


