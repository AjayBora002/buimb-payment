// Types mirroring the real responses from apps/api/src/modules/iam/iam.service.ts
// Keep these in sync with the backend — do not invent fields that aren't returned.
export class ApiError extends Error {
    status;
    body;
    constructor(message, status, body) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.body = body;
    }
}
