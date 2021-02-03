export class OperationResult<T>{
    public success: boolean | undefined
    public message: string | undefined
    public result: T | undefined
}