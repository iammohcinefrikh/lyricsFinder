import {StatusCodes} from 'http-status-codes'

class NotFoundError extends Error {
    statusCode:number;
    constructor(message: string = "Not Found Error Personalisee"){
        super(message);
        this.name = "NotFoundError";
        this.statusCode = StatusCodes.NOT_FOUND; 
    }
}

export default NotFoundError;