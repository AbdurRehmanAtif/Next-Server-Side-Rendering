export default class CustomError extends Error {
    statusCode?: number;
    success?: boolean;
    message: string;
    error?: string;

    constructor(message: string, statusCode?: number, success?: boolean, error?: string) {
        super(message); // Call the Error constructor with the provided message

        // Initialize the custom properties
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.error = error;
        // Ensure correct prototype chain
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
