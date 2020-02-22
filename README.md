# ⚡️ Cloudflare Worker Google Analytics First-Party Handler
> Track Google Analytics call first-party style without needing to loading the bloated `analytics.js`.

## Background

Google Analytics is a great free tool, but there are privacy concerns due to Google. Simply loading the Google
Analytics js file on your site means requests will travel through Googles Network, and then their script has
access to your page.

This can be avoided by captuing the necessary things we care about in our application (page views, events, etc) and then
sending them to a handler on our own domain (first-party).  And from there, sending the data to Google Analytics.

This technique gives us the benefits>

* The bloated `analytics.js` file doesn't need to be loaded by the visitor.
* The visitor doesn't make any network requests to Google.
* Analytics are more accurate as the first-party tracking traffic won't be blocked by any ad blockers.

A Cloudflare Worker is an excellent candidate for this work because they live on same domain, and can handle the forwarding
of data to Google Analytics transparently.

## Getting Started

> yarn publish X-1234567