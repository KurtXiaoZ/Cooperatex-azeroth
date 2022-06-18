export const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjIzODA3MzMsInVzZXJJZCI6IjEwMDAxIn0.4R7z0fOAl36DQmzU0BcVDwGN9MAg4dVbKPu35UMMjt8';
export const URL = 'http://data.reachplatform.org';
export const TEST_APP_ID = '8331668412869';

export async function request(url: string, config?: object, data?: any) {
    if(config === undefined) config = {};
    if(config['headers'] === undefined) config['headers'] = {};
    config['headers']['token'] = TOKEN;
    return await (await fetch(url, config)).json();
}