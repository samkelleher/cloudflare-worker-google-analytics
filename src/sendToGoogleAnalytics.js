import languageParser from "accept-language-parser";
import queryString from "query-string";
import uuid from "uuid";

export async function transmitPayload(payload, userAgent) {
    const body = queryString.stringify(payload);
    let success = false;
    try {
        const response = await fetch("https://www.google-analytics.com/collect", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": userAgent,
            },
            body,
        });
        success = response.ok;
    } catch (error) {
        console.log(error);
    }

    return {
        success,
        payload,
        body
    };
}

export function getBasicDataFromRequest(headers) {
    const requestLanguage = languageParser.parse(headers.get("accept-language"));

    const data = {
        ua: headers.get("user-agent"), // the users User Agent.
        uip: headers.get("cf-connecting-ip"), // the users IP address
    };

    if (requestLanguage && requestLanguage.length) {
        const language = requestLanguage[0];
        data.ul = language.region ? `${language.code}-${language.region}` : language.code;
    }

    return data;
}

export function getDataFromRequest(headers) {
    let data = getBasicDataFromRequest(headers);

    // Attach anon ID for all requests, in addition to UserId.
    // TODO: Read from cookie
    data.cid = uuid.v4(); // "Client ID", aka the anonymous user ID,

    return data;
}

export function getAccountInfo(accountId) {
    return {
        v: "1", // Version
        tid: accountId,
        ds: "web", // source
    };
}

