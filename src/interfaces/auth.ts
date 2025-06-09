export default interface Auth {
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