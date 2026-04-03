// Payment constants - amounts are in cents (Paymob uses smallest currency unit)
export const PAYMENT_AMOUNTS = {
    // HR Booking - 100 EGP (10000 cents)
    HR_BOOKING: 10000,
    
    // Plan Upgrade - Basic: 200 EGP (20000 cents)
    PLAN_BASIC: 20000,
    
    // Plan Upgrade - Pro: 500 EGP (50000 cents)
    PLAN_PRO: 50000,
} as const;

export const PAYMENT_CURRENCY = "EGP" as const;
