# AGENTS.md — Zenvia SDK for Node.js

## Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Lint | `npm run lint` |
| Lint + auto-fix | `npm run lint:fix` |
| Test (with coverage) | `npm run test` |
| Build | `npm run build` |

**Verification order:** `lint → test → build`

## Architecture

- **Package:** `@zenvia/sdk` (v2.4.4), published to npm as public scoped package
- **Entry point:** `src/index.ts` → exports `Client`, `WebhookController`, `SmsMessageBatch`, `WhatsAppMessageBatch`, and all types
- **Build output:** `dist/` (CommonJS, ES2017 target, declarations included)
- **API version:** v2 (`/v2/...` endpoints)

### Module structure (`src/lib/`)

| Directory | Purpose |
|-----------|---------|
| `channels/` | SMS, RCS, Facebook, WhatsApp, Instagram, Telegram, GBM, Email |
| `contents/` | Message content types (Text, File, Location, Contacts, Template, Email, Card, Carousel, ReplyableText) |
| `message-batches/` | SMS and WhatsApp batch sending |
| `reports/` | Flow and message reporting |
| `subscriptions/` | Webhook subscription management |
| `templates/` | Template CRUD |
| `webhook.ts` | Express-based webhook server for receiving events |

### Client usage pattern

```ts
const client = new Client('API_TOKEN');
const channel = client.getChannel('whatsapp');
await channel.sendMessage(from, to, content);
```

## Testing

- **Framework:** Mocha + Chai + Sinon + Nock
- **Assertion style:** `should()` with `sinon-chai` and `chai-as-promised`
- **Test files:** `test/**/*.spec.ts` (mirrors `src/` structure)
- **Coverage:** NYC, reports to `coverage/`, excludes `src/index.ts` and `**/*.d.ts`
- **Test setup:** `test/ts-node-register.js` bootstraps ts-node; `test/common.ts` sets `NODE_ENV=test` and `TZ=UTC`
- Run a single test: `npm run test -- --grep "pattern"`

## Style / Lint

- **Linter:** TSLint (deprecated but still in use) extending `tslint:recommended` + `tslint-config-airbnb`
- **Key conventions:** single quotes, semicolons required, trailing commas on multiline, 2-space indent
- **Excluded from lint:** `src/types/**/*`
- **Disabled rules:** `no-any`, `no-null-keyword`, `no-shadowed-variable`, `max-line-length`, `object-literal-sort-keys`, `ordered-imports`, `variable-name`, `strict-boolean-expressions`

## Publishing

- Triggered automatically on **GitHub release creation** via `.github/workflows/test-and-deploy.yml`
- CI runs lint → test → build, then `npm publish` if all pass
- `publishConfig.access: public` in package.json

## Gotchas

- **TSLint is deprecated** — do not migrate to ESLint unless explicitly requested
- **CI uses Node 10** — keep compatibility with Node 10+
- **`request` / `request-promise`** are deprecated HTTP clients — do not swap without explicit request
- **`src/types/**/*`** excluded from linting
- **`openapi.yaml`** at root is the Zenvia OpenAPI spec reference, not generated from code
