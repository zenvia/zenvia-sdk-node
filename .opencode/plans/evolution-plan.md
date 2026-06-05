# Mapeamento OpenAPI → SDK e Plano de Evolução

## 1. Mapeamento Completo

### 1.1 Endpoints da API vs Funcionalidades Implementadas

| Tag OpenAPI | Endpoint | Método | Implementado no SDK? | Observação |
|---|---|---|---|---|
| **Two Factor Authentication** | `/2fa-configurations` | POST, GET | ❌ Não | |
| | `/2fa-configurations/{id}` | GET, DELETE, PATCH | ❌ Não | |
| | `/2fa-configurations/{id}/actions/website-key-recreate` | POST | ❌ Não | |
| | `/2fa-tokens` | POST | ❌ Não | |
| | `/2fa-tokens/actions/resend` | POST | ❌ Não | |
| | `/2fa-tokens/actions/verify` | POST | ❌ Não | |
| | `/2fa-tokens/{id}/actions/resend` | POST | ❌ Não | |
| | `/2fa-tokens/{id}/actions/verify` | POST | ❌ Não | |
| **Message Batches** | `/message-batches` | POST (multipart) | ⚠️ Parcial | `SmsMessageBatch` e `WhatsAppMessageBatch` existem mas não expõem full API |
| **E-Mail** | `/channels/email/messages` | POST | ✅ Sim | `EmailChannel.sendMessage()` |
| **Facebook** | `/channels/facebook/messages` | POST | ✅ Sim | `FacebookChannel.sendMessage()` |
| **Google Business Messages** | `/channels/gbm/messages` | POST | ✅ Sim | `GbmChannel.sendMessage()` |
| **Instagram** | `/channels/instagram/messages` | POST | ✅ Sim | `InstagramChannel.sendMessage()` |
| **RCS** | `/channels/rcs/messages` | POST | ✅ Sim | `RcsChannel.sendMessage()` |
| **SMS** | `/channels/sms/messages` | POST | ✅ Sim | `SmsChannel.sendMessage()` |
| **Telegram** | `/channels/telegram/messages` | POST | ✅ Sim | `TelegramChannel.sendMessage()` |
| **Voice** | `/channels/voice/messages` | POST | ❌ Não | Channel não existe |
| **WhatsApp** | `/channels/whatsapp/messages` | POST | ✅ Sim | `WhatsAppChannel.sendMessage()` |
| **Chatbot Outbound** | `/chatbot-outbounds` | POST | ❌ Não | |
| **Contact Batches** | `/contact-batches` | POST, GET | ❌ Não | |
| | `/contact-batches/{id}` | GET | ❌ Não | |
| **Contact Custom Data Fields** | `/contact-custom-data-fields` | POST, GET | ❌ Não | |
| **Contact Lists** | `/contact-lists` | POST, GET | ❌ Não | |
| | `/contact-lists/{id}` | GET, PATCH, DELETE | ❌ Não | |
| | `/contact-lists/{id}/contacts` | GET | ❌ Não | |
| **Contacts** | `/contacts` | POST, GET | ❌ Não | |
| | `/contacts/{id}` | GET, PATCH, DELETE | ❌ Não | |
| **Files** | `/files` | POST, GET | ❌ Não | |
| | `/files/{id}` | GET, DELETE | ❌ Não | |
| **Flow Batches** | `/flow-batches` | POST, GET | ❌ Não | |
| | `/flow-batches/{id}` | GET | ❌ Não | |
| | `/flow-batches/{id}/actions/cancel` | POST | ❌ Não | |
| | `/flow-batches/{id}/actions/pause` | POST | ❌ Não | |
| | `/flow-batches/{id}/actions/resume` | POST | ❌ Não | |
| **Invoice Batches** | `/invoice-batches` | POST, GET | ❌ Não | |
| | `/invoice-batches/{id}` | GET | ❌ Não | |
| **Marketing Automations** | `/marketing-automations/{id}/dispatches` | POST | ❌ Não | |
| **Order Batches** | `/order-batches` | POST, GET | ❌ Não | |
| | `/order-batches/{id}` | GET | ❌ Não | |
| **Product Batches** | `/product-batches` | POST, GET | ❌ Não | |
| | `/product-batches/{id}` | GET | ❌ Não | |
| **Flow Report** | `/reports/flow/entries` | GET | ✅ Sim | `ReportFlow.getEntries()` |
| **Message Report** | `/reports/message/entries` | GET | ✅ Sim | `ReportMessages.getEntries()` |
| **Status Groups** | `/status-groups` | GET | ❌ Não | |
| | `/status-groups/{id}` | GET | ❌ Não | |
| **Webhooks (Subscriptions)** | `/subscriptions` | POST, GET | ✅ Sim | Client methods |
| | `/subscriptions/{id}` | GET, DELETE, PATCH | ✅ Sim | Client methods |
| **Tickets** | `/tickets` | POST, GET | ❌ Não | |
| | `/tickets/{id}` | GET | ❌ Não | |
| | `/tickets/{id}/actions` | GET, POST | ❌ Não | |
| | `/tickets/{id}/attributes/*` | PATCH (8 endpoints) | ❌ Não | |
| | `/tickets/{id}/owner-changes` | GET | ❌ Não | |
| | `/tickets/{id}/status-changes` | GET | ❌ Não | |
| **Ticket Tags** | `/tickets/{id}/tags` | GET, POST | ❌ Não | |
| | `/tickets/{id}/tags/{id}` | DELETE | ❌ Não | |
| **Templates** | `/templates` | POST, GET | ✅ Sim | Client methods |
| | `/templates/{id}` | GET, DELETE, PATCH | ✅ Sim | Client methods |
| | `/templates/{id}/comments` | POST, GET | ❌ Não | |
| | `/templates/{id}/comments/{id}` | DELETE | ❌ Não | |

### 1.2 Content Types no OpenAPI vs SDK

| Content Type | OpenAPI | SDK Class | Gap |
|---|---|---|---|
| `text` | ✅ | `TextContent` | ✅ OK |
| `file` | ✅ | `FileContent` | ✅ OK |
| `template` | ✅ | `TemplateContent` | ✅ OK |
| `location` | ✅ | `LocationContent` | ✅ OK |
| `contacts` | ✅ | `ContactsContent` | ✅ OK |
| `email` | ✅ | `EmailContent` | ✅ OK |
| `card` | ✅ | `CardContent` | ✅ OK |
| `carousel` | ✅ | `CarouselContent` | ✅ OK |
| `replyable_text` | ✅ | `ReplyableTextContent` | ✅ OK |
| `call` (Voice) | ✅ | ❌ | **Faltando** |
| `button` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `list` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `product` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `product_list` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `flow` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `order_details` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `order_status` (WhatsApp) | ✅ | ❌ | **Faltando** |
| `optin_request` | ✅ | ❌ | **Faltando** |
| `optin_response` | ✅ | ❌ | **Faltando (webhook)** |
| `json` | ✅ | ❌ (só interface) | **Parcial** |
| `conversation` | ✅ | ❌ | **Faltando** |

### 1.3 Channels no OpenAPI vs SDK

| Channel | OpenAPI | SDK Class | Gap |
|---|---|---|---|
| SMS | ✅ | `SmsChannel` | ✅ OK |
| WhatsApp | ✅ | `WhatsAppChannel` | ⚠️ Faltam content types |
| Facebook | ✅ | `FacebookChannel` | ⚠️ Faltam optin_request/response |
| Instagram | ✅ | `InstagramChannel` | ⚠️ Faltam optin_request/response |
| Telegram | ✅ | `TelegramChannel` | ✅ OK |
| RCS | ✅ | `RcsChannel` | ⚠️ Faltam location |
| GBM | ✅ | `GbmChannel` | ✅ OK |
| Email | ✅ | `EmailChannel` | ✅ OK |
| **Voice** | ✅ | ❌ | **Faltando channel inteiro** |

---

## 2. Plano de Evolução do SDK

### Fase 1: Correções e Completudes (Prioridade Alta)

#### 1.1 WhatsApp - Content Types Faltantes
- [ ] `ButtonContent` - Interactive buttons (header, body, footer, buttons)
- [ ] `ListContent` - Interactive lists (header, body, footer, button, sections)
- [ ] `ProductContent` - Single product (body, footer, catalogId, productId)
- [ ] `ProductListContent` - Product list with sections
- [ ] `FlowContent` - WhatsApp Flows integration
- [ ] `OrderDetailsContent` - Payment/orders (boleto, pix, payment link)
- [ ] `OrderStatusContent` - Order status updates
- [ ] Atualizar `WhatsAppChannel` para suportar novos content types

#### 1.2 Facebook/Instagram - Opt-in
- [ ] `OptInRequestContent` - Recurring messages opt-in
- [ ] Atualizar `FacebookChannel` e `InstagramChannel`

#### 1.3 RCS - Location
- [ ] Adicionar `LocationContent` ao `RcsChannel.supportedContents`

### Fase 2: Novos Channels (Prioridade Alta)

#### 2.1 Voice Channel
- [ ] Criar `VoiceChannel` em `src/lib/channels/voice.ts`
- [ ] Criar `CallContent` com:
  - `audio[]`: TTS (text, voiceStyle, awaitRecipientAnswer) ou File (fileUrl)
  - `transferTo?`: phone number
  - `recordAudio?`: boolean
  - `hangUpOnVoiceMail?`: boolean
- [ ] Adicionar ao `Client.getChannel()`
- [ ] Tests

### Fase 3: Novas APIs de Gestão (Prioridade Média)

#### 3.1 Contacts API
- [ ] Criar `ContactsClient` em `src/lib/contacts/`
  - `create(contact)`, `list(filters)`, `get(id)`, `update(id)`, `delete(id)`
- [ ] Criar `ContactListsClient`
  - `create(list)`, `list()`, `get(id)`, `update(id)`, `delete(id)`, `listContacts(id)`
- [ ] Criar `ContactCustomDataFieldsClient`
  - `create(field)`, `list()`
- [ ] Adicionar ao Client: `getContactsClient()`

#### 3.2 Files API
- [ ] Criar `FilesClient` em `src/lib/files/`
  - `upload(file, data)`, `list(filters)`, `get(id)`, `delete(id)`
- [ ] Suporte a multipart e binary upload
- [ ] Adicionar ao Client: `getFilesClient()`

#### 3.3 Two Factor Authentication (2FA)
- [ ] Criar `TwoFactorAuthClient` em `src/lib/2fa/`
  - Configurations: `create()`, `list()`, `get()`, `update()`, `delete()`, `recreateWebsiteKey()`
  - Tokens: `send()`, `resend()`, `verify()`
- [ ] Adicionar ao Client: `getTwoFactorAuthClient()`

### Fase 4: APIs de Batch e Automação (Prioridade Média)

#### 4.1 Flow Batches
- [ ] Criar `FlowBatchesClient`
  - `create(json/csv)`, `list()`, `get(id)`, `cancel(id)`, `pause(id)`, `resume(id)`

#### 4.2 Partner Batches (Contact/Invoice/Order/Product)
- [ ] Criar `ContactBatchesClient`, `InvoiceBatchesClient`, `OrderBatchesClient`, `ProductBatchesClient`
  - Padrão comum: `import(file)`, `list()`, `get(id)`

#### 4.3 Marketing Automations
- [ ] Criar `MarketingAutomationsClient`
  - `dispatch(automationId, recipientChannels, variables)`

### Fase 5: APIs de Suporte e Monitoramento (Prioridade Baixa)

#### 5.1 Tickets (Support Service)
- [ ] Criar `TicketsClient`
  - CRUD completo + actions + attribute updates (category, clients, owner, service, solution, status, subject, type, urgency)
  - `listOwnerChanges()`, `listStatusChanges()`
- [ ] Criar `TicketTagsClient`

#### 5.2 Status Groups
- [ ] Criar `StatusGroupsClient`
  - `list()`, `get(id)`

#### 5.3 Chatbot Outbound
- [ ] Criar `ChatbotOutboundClient`
  - `trigger(outbound)`

### Fase 6: Melhorias no Webhook (Prioridade Média)

#### 6.1 Novos Event Types
- [ ] `ConversationMessageEvent` handler
- [ ] `ConversationStatusEvent` handler
- [ ] `ContactEvent` handler
- [ ] `SupportExpertAgentEvent` handler

#### 6.2 Template Comments
- [ ] Adicionar `listTemplateComments(templateId)`, `createTemplateComment()`, `deleteTemplateComment()` ao Client

### Fase 7: Melhorias Infraestruturais (Prioridade Baixa)

#### 7.1 TypeScript Types
- [ ] Gerar types automaticamente do OpenAPI (usar `openapi-typescript` ou similar)
- [ ] Adicionar tipos para todos os schemas faltantes no `src/types/zenvia.ts`

#### 7.2 Testes
- [ ] Adicionar testes para Reports, Subscriptions CRUD, Templates CRUD
- [ ] Adicionar testes para todos os novos módulos

#### 7.3 Modernização (futuro)
- [ ] Migrar de `request`/`request-promise` para `axios` ou `node-fetch`
- [ ] Migrar de TSLint para ESLint
- [ ] Adicionar suporte a Node 18+ (atualmente compatível com Node 10)

---

## 3. Resumo de Prioridades

| Fase | Escopo | Esforço | Impacto |
|---|---|---|---|
| **Fase 1** | Content types WhatsApp/Facebook/Instagram | Médio | Alto |
| **Fase 2** | Voice Channel | Médio | Alto |
| **Fase 3** | Contacts, Files, 2FA APIs | Alto | Alto |
| **Fase 4** | Flow Batches, Partner Batches, Marketing | Alto | Médio |
| **Fase 5** | Tickets, Status, Chatbot Outbound | Alto | Baixo |
| **Fase 6** | Webhook events, Template comments | Médio | Médio |
| **Fase 7** | Types, testes, modernização | Alto | Médio |
