import {Authentication} from "../types/common/classes/authentication";
import ConstellioCollection from "../types/common/classes/constellio-collection";
import {getCollectionsFunc} from "../types/common/services/constellio-service";
import axios from 'axios';

export const getCollections:getCollectionsFunc = (authenticationObject:Authentication):Promise<ConstellioCollection[]> => {
    let headers = buildConstellioAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/v1/collections";
    const params = {
        serviceKey: authenticationObject.serviceKey
    };
    return new Promise((resolve, reject) => {
        axios.get(generateUrl, {params, headers}).then(response => {
            let constellioCollection: ConstellioCollection[] = [];
            if (response.data) {
                constellioCollection.push(response.data);
                resolve(constellioCollection);
            } else {
                reject({message:response.data, error:"Could not fetch Constellio collections"});
            }
        }).catch(error => {
            reject({message:error, error:"Could not fetch Constellio collections"});
        });
    });
}