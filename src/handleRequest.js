import { getAccountInfo, transmitPayload, getDataFromRequest } from "./sendToGoogleAnalytics.js";
import queryString from "query-string";

export function killWithErrorCode(status) {
    return new Response(null, {
        headers: { 'status': status },
    })
}

export default async function handleRequest(request, event) {
    if (request.method !== 'POST') {
        // Method Not Allowed
        return killWithErrorCode(405);
    }

    const contentType = request.headers.get('content-type');

    if (!contentType) {
        // Bad Request
        return killWithErrorCode(400);
    }

    let params = {};

    if (contentType.includes('text/plain')) {
        const paramsAsString = await request.text();
        params = queryString.parse(paramsAsString);
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        for (let entry of formData.entries()) {
            params[entry[0]] = entry[1]
        }
    } else {
        // Bad Request
        return killWithErrorCode(400);
    }

    const payload = {
        ...params,
        ...getDataFromRequest(request.headers),
        ...getAccountInfo(GA_TRACKING_ID)
    };

    // We will wait for the relayed request to complete before responding.
    event.waitUntil(transmitPayload(payload, payload.ua));

    return new Response(JSON.stringify(payload), {
        headers: { 'content-type': 'text/plain' },
        status: 202
    })
}
