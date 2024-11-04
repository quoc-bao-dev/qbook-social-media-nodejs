import { CustomError } from "./CustomError";

// Lỗi yêu cầu không hợp lệ
export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

// Lỗi xác thực không thành công
export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }
}

// Lỗi yêu cầu truy cập tài nguyên bị từ chối
export class ForbiddenError extends CustomError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

// Lỗi không tìm thấy tài nguyên
export class NotFoundError extends CustomError {
    constructor(message: string = 'Not Found') {
        super(message, 404);
    }
}

// Lỗi xung đột trong quá trình xử lý yêu cầu (ví dụ: dữ liệu trùng lặp)
export class ConflictError extends CustomError {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Constructs a new ConflictError instance.
     *
     * @param message - The error message, defaulting to 'Conflict'.
     */
    /******  1edc7f5f-1012-4cfc-86d8-2f6f32be0050  *******/
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}

// Lỗi xử lý phía máy chủ
export class InternalServerError extends CustomError {
    constructor(message: string = 'Internal Server Error') {
        super(message, 500);
    }
}