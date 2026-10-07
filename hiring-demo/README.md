# Workflow evidence lab — Siddharth Saxena

Independent portfolio work, not client or production deployment.

## Working demos

Public portfolio: https://siddharth-saxena-automation-lab.siddharthmanu1995.chatgpt.site

Open **Try working demos** from the portfolio. No credentials required.

### Excel business automation

`validation.js` wraps the exact JavaScript Code node from the supplied n8n export with an `$input` adapter. The node body is unchanged. It reconstructs missing Revenue/Cost/Profit, flags dates and missing fields, and normalizes negative numeric units. The editable browser demo executes this code locally. KPI totals and result downloads are additional demo features.

**Example:** missing Revenue, Cost=4000, Profit=2000 gives Revenue=6000. Negative Units Sold=-6 becomes 6 with a validation issue. Invalid dates remain flagged.

**Known limitation:** string Cost='4000' and Profit='2000' produce Revenue='40002000'. This is demonstrated, not concealed. Numeric coercion, zero fallback policy, negative unit policy and date normalization need business review.

**Not live in this demo:** Sheets read/write, Gemini analysis, HTTP POST, Gmail delivery, sheet logging. Forecasts and business recommendations are not fabricated. The source LLM prompt contains malformed JSON in its requested example; output parsing and error routing need verification before live use. Success/failure branches exist in the export but are not proof of successful delivery.

### AI Email Assistant

The second upload, originally `My workflow.json`, contains five nodes: chat trigger, AI Agent, OpenAI model, Simple Memory (100-message context), and Gmail tool. It is an email assistant, not a lead qualification workflow.

The demo uses a deterministic template with the source-required sign-off `Best regards, Siddharth.` Session memory is browser-memory-only, limited to 100 interactions and cleared on reload. OpenAI responses and Gmail sends are not executed. The template visibly retains the user's request as context rather than pretending a model followed it.

## Reproduce

Open `index.html` through a static HTTP server. Run tests with:

```sh
node test.cjs
```

Tests cover numeric reconstruction, negative units, date flags, empty input and the known numeric-string limitation. No external network calls in demo JavaScript.

## n8n import

Download the sanitized workflows. Reconnect your own credentials and replace every `YOUR_SHEET_ID`, `YOUR_TAB`, example recipient and `CONFIGURE_ENDPOINT`. Exports are inactive. Validate prompts and outputs, add send approval for email, and test error handling in a separate environment before enabling.

## Publishing hygiene

Credential references, pinned chats, workflow identity and sheet resource selectors were removed or replaced. Original uploads are preserved. The sanitized files are templates, not a claim of production readiness.
