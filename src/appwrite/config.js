import { Client, Account } from 'appwrite'

const client = new Client();

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('672c6af3000285b5b957');

export const account = new Account(client)

export default client