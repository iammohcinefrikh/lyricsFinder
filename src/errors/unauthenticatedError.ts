import {StatusCodes} from 'http-status-codes'

class UnAuthenticatedError extends Error {
    statusCode:number;
    constructor(message: string = "UnAuthenticated Error Personalisee"){
        super(message);
        this.name = "UnAuthenticatedError";
        this.statusCode = StatusCodes.UNAUTHORIZED; 
    }
}

export default UnAuthenticatedError;