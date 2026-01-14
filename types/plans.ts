export type Plan = {
  id: number
  planStatus: PlanStatus
  actual: boolean
  autoRenewEnabled: boolean
  basePlanId: BasePlanIds
  creditsLimit: number
  currency: string
  expiryTime: string
  inputUsedCredits: number
  linkedPurchaseToken: string | null
  name: string
  outputUsedCredits: number
  price: string
  purchaseToken: string
  regionCode: string
  startPayment: string
  startTime: string
  subscriptionId: string
  usedCredits: number
  usedTrial: boolean
}

export enum BasePlanIds {
  TESTING = 'testing',
  START = 'start-d7',
  LITE_M1 = 'lite-m1',
  BASE_M1 = 'base-m1',
  PRO_M1 = 'pro-m1',
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  IN_GRACE = 'IN_GRACE',
  ON_HOLD = 'ON_HOLD',
  PAUSED = 'PAUSED',
  RESTARTED = 'RESTARTED',
  REFUNDED = 'REFUNDED',
  TOKEN_EXCEEDED = 'TOKEN_EXCEEDED',
  CREDIT_EXCEEDED = 'CREDIT_EXCEEDED',
}
