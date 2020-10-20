import {Authentication} from "../../types/common/classes/authentication";
import {FolderQueryResults, searchFoldersFunc} from "../../types/common/classes/folder";
import Query,{QueryResults,searchFunc} from "../../types/common/classes/query"
import axios from 'axios';
import {API_VERSION} from "../../constant";

export const search: searchFoldersFunc = async  (authenticationObject: Authentication, query: Query): Promise<FolderQueryResults> => {
    let headers = buildAuthenticatedHeader(authenticationObject.token);
    const generateUrl = authenticationObject.url + "/rest/" + API_VERSION + "/folders/";
    return new Promise((resolve, reject) => {
        axios.post(generateUrl, {headers})
            .then(function (response: any) {
                if (response.data) {
                    resolve(response.data);
                } else {
                    reject({message: response.data, error: "Could not fetch Constellio folders "});
                }
            }).catch(error => {
            reject({message: error, error: "Could not fetch Constellio folders "});
        });
    });
}

const buildAuthenticatedHeader = (token: string | undefined): any => {

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}