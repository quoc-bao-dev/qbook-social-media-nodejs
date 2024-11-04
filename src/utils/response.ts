export class ResponseBuilder {
    private data: any;
    private message: string;
    private statusCode: number;

    constructor(data?: any, message: string = '', statusCode: number = 200) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    setData(data: any) {
        this.data = data;
        return this;
    }

    setMessage(message: string) {
        this.message = message;
        return this;
    }

    setStatusCode(statusCode: number) {
        this.statusCode = statusCode;
        return this;
    }

    build(): { data: any; message: string; statusCode: number } {
        return {
            data: this.data,
            message: this.message,
            statusCode: this.statusCode,
        }
    }
}
