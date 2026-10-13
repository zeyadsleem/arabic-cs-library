---
title: "Rate Limit"
lang: en
chapter: concepts
slug: rate-limit
order: 31
source: https://better-auth.com/docs/concepts/rate-limit
---

# Rate Limit (/docs/concepts/rate-limit)

Learn how to configure rate limiting in Better Auth, including IP address detection, IPv6 support, custom rate limit windows, storage backends, error handling, and per-endpoint rules.

Better Auth includes a built-in rate limiter to help manage traffic and prevent abuse. By default, in production mode, the rate limiter is set to:

* Window: 10 seconds
* Max Requests: 100 requests

::: {warning}
Server-side requests made using `auth.api` aren't affected by rate limiting. Rate limits only apply to client-initiated requests.
:::

You can easily customize these settings by passing the rateLimit object to the betterAuth function.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    rateLimit: {
        window: 10, // time window in seconds
        max: 100, // max requests in the window
    },
})
```

Rate limiting is disabled in development mode by default. In order to enable it, set `enabled` to `true`:

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    rateLimit: {
        enabled: true,
        //...other options
    },
})
```

In addition to the default settings, Better Auth provides custom rules for specific paths. For example:

* `/sign-in/email`: Is limited to 3 requests within 10 seconds.

In addition, plugins also define custom rules for specific paths. For example, `twoFactor` plugin has custom rules:

* `/two-factor/*`: Is limited to 3 requests within 10 seconds.

These custom rules ensure that sensitive operations are protected with stricter limits.

## Configuring Rate Limit

### Connecting IP Address

Rate limiting uses the connecting IP address to track the number of requests made by a user. The
default header checked is `x-forwarded-for`, which is commonly used in production environments. If
you are using a different header to track the user's IP address, you'll need to specify it.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    advanced: {
        ipAddress: {
          ipAddressHeaders: ["cf-connecting-ip"], // Cloudflare specific header example
      },
    },
    rateLimit: {
        enabled: true,
        window: 60, // time window in seconds
        max: 100, // max requests in the window
    },
})
```

By default Better Auth does not trust comma-separated forwarded IP chains, since
the leftmost `X-Forwarded-For` token is client-controlled behind an appending
proxy. Behind a reverse proxy or load balancer, do one of the following.

Point `ipAddressHeaders` at a single trusted header your proxy sets (for example
`x-real-ip` or `cf-connecting-ip`):

```ts title="auth.ts"
export const auth = betterAuth({
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["x-real-ip"],
        },
    },
})
```

Or list your proxies in `trustedProxies`. Better Auth walks the chain right to
left, skips the trusted hops, and takes the first untrusted address as the client:

```ts title="auth.ts"
export const auth = betterAuth({
    advanced: {
        ipAddress: {
            // your proxies' addresses, not a broad private range that also covers clients
            trustedProxies: ["192.0.2.10", "10.0.0.0/24"],
        },
    },
})
```

::: {warning}
`trustedProxies` only interprets the forwarded header chain and cannot verify the
direct sender. Keep your origin reachable only through these proxies, and make each
proxy overwrite or sanitize the forwarded IP headers. Otherwise a client can set
`X-Forwarded-For` directly and spoof its address.
:::

#### IPv6 Address Support

Better Auth automatically normalizes IPv6 addresses to prevent bypass attacks where attackers use different representations of the same IPv6 address (e.g., `2001:db8::1` vs `2001:0db8:0000:0000:0000:0000:0000:0001`). This ensures that all representations of the same IPv6 address are treated as the same for rate limiting purposes.

Additionally, IPv4-mapped IPv6 addresses (e.g., `::ffff:192.0.2.1`) are automatically converted to their IPv4 form (`192.0.2.1`) to prevent attackers from bypassing rate limits by switching between IPv4 and IPv6 representations.

#### IPv6 Subnet Rate Limiting

By default, IPv6 addresses are rate limited per `/64` subnet, not per individual address. ISPs and cloud providers assign IPv6 prefixes (typically `/64` for residential users per [RFC 6177](https://datatracker.ietf.org/doc/html/rfc6177)) rather than single addresses, so any per-address counter would let one client rotate through 2^64 source addresses without exhausting the limit.

You can override the prefix length via the `ipv6Subnet` option if your deployment needs a different allocation boundary:

```ts title="auth.ts"
export const auth = betterAuth({
    //...other options
    advanced: {
        ipAddress: {
            ipv6Subnet: 56, // Rate limit by /56 subnet (residential ISP allocation)
        },
    },
    rateLimit: {
        enabled: true,
        window: 60,
        max: 100,
    },
})
```

Common IPv6 prefix lengths:

* `128`: Individual IPv6 address. Most restrictive. Only safe when you control the network and trust that each address maps to a distinct client.
* `64` (default): /64 subnet. Typical home or business allocation.
* `56`: /56 subnet. Residential ISP allocation per [RFC 6177](https://datatracker.ietf.org/doc/html/rfc6177).
* `48`: /48 subnet. Larger network allocation.
* `32`: /32 subnet. ISP-level allocation.

Any integer prefix length from `0` to `128` is accepted; the values above are the most common.

::: {note}
IPv6 subnet configuration only affects IPv6 addresses. IPv4 addresses are always rate limited individually.
:::

### Rate Limit Window

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        window: 60, // time window in seconds
        max: 100, // max requests in the window
    },
})
```

You can also pass custom rules for specific paths.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        window: 60, // time window in seconds
        max: 100, // max requests in the window
        customRules: {
            "/sign-in/email": {
                window: 10,
                max: 3,
            },
            "/two-factor/*": async (request)=> {
                // custom function to return rate limit window and max
                return {
                    window: 10,
                    max: 3,
                }
            }
        },
    },
})
```

If you like to disable rate limiting for a specific path, you can set it to `false` or return `false` from the custom rule function.

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        customRules: {
            "/get-session": false,
        },
    },
})
```

### Storage

By default, rate limit data is stored in memory, which may not be suitable for many use cases, particularly in serverless environments. To address this, you can use a database, secondary storage, or custom storage for storing rate limit data.

**Using Database**

```ts title="auth.ts"
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    //...other options
    rateLimit: {
        storage: "database",
        modelName: "rateLimit", //optional by default "rateLimit" is used
    },
})
```

Make sure to run `migrate` to create the rate limit table in your database:
