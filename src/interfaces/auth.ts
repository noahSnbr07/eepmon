export default interface Auth {
    authenticated: boolean;
    id: string;
    created: Date;
    updated: Date;
    name: string;
    suspended: boolean;
    superuser: boolean;
    monitorId: string;
    profileId: string;
    issuer: string;
}