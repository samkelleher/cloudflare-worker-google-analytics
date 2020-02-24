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

1. Edit [.env](./.env) file in the directory root, and add your Google Analytics tracking ID and domain name.
2. Edit [wrangler.toml](./wrangler.toml) and add your Cloudflare Account ID.
3. Optional, run `yarn wrangler config` if you are not already logged in to your Cloudflare Account locally.
4. Run `yarn deploy` to build and push the worker to your account, where it can then be tested or linked to a zone.s

### 🧑🏼‍💻 Author

Created as a sample worker by [Sam Kelleher](https://samkelleher.com/).
