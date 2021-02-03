import { Business } from '../../models/Business';
import { OperationResult } from '../../models/OperationResult';
import { URL_API } from "../../config/url.services"

export class BusinessService {
    async getAll(): Promise<OperationResult<Business[]>> {
        let uri = URL_API + "businesses"

        var businesses = await fetch(uri).then(res => res).then<OperationResult<Business[]>>(data => data.json());

        return new OperationResult<Business[]>()
    }
}