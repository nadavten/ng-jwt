import * as process from 'process';
export const config = {
    secret : 'mylittlesecret',
    port: process.env.PORT || 8080,
    connectionString:'mongodb://localhost/jwt-test',
    tokenExpirationInSec : 60*60*24  // 24 hours
}