class AppError extends Error{
    message!: string;
    statusCode: number;
    explantion: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.explantion = message;
    };
};

export default AppError;