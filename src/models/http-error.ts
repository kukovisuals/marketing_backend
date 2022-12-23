class HttpError extends Error{
    code: string   
    constructor(message:any, errorCode:any){
        super(message);
        this.code = errorCode
    }
}
export default HttpError;