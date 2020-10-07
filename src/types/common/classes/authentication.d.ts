export interface Authentication {
    token?: string;
    serviceKey?: string;
    duration?: string;
    error?:string;
}

export default interface Login {
    url: string,
    username: string,
    password: string,
    duration?: string
}