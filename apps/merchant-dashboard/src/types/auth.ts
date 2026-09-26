// Types mirroring the real responses from apps/api/src/modules/iam/iam.service.ts
// Keep these in sync with the backend — do not invent fields that aren't returned.

export interface LoginResponseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  merchantId: string | undefined;
  role: string | undefined;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: LoginResponseUser;
}

export interface RefreshResponse {
  accessToken: string;
}

// GET /v1/auth/me (IamService.getProfile) shape
export interface MerchantUserSummary {
  merchant: {
    id: string;
    displayName: string;
    legalName: string;
    status: string;
    kycStatus: string;
  };
  role: {
    name: string;
    description: string | null;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  status: string;
  mfaEnabled: boolean;
  createdAt: string;
  merchantUsers: MerchantUserSummary[];
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}
