import {StatusCodes} from 'http-status-codes'

class BadRequestError extends Error {
    statusCode:number;
    constructor(message: string = "Bad Request"){
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST; 
    }
}

export default BadRequestError;