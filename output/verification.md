# Portfolio verification — 6 October 2026

Preview: http://127.0.0.1:3001

## Production system

- Next.js 16.3.8 production image builds and serves successfully.
- Spring Boot 4.1.1 / Java 21 API builds and starts successfully.
- PostgreSQL 18 is healthy. Flyway migrations V1 and V2 are applied; four projects are present.
- Frontend, backend and database Docker health checks all pass.
- The browser uses the explicit IPv4 loopback address to avoid another app listening on IPv6 localhost.

## Automated checks

Three Spring application integration tests pass:

- Catalog endpoints, featured projects, case studies and missing-resource responses.
- Valid contact persistence, invalid fields, malformed JSON and oversized request rejection.
- Configured CORS origin acceptance and other origin rejection.

Four Playwright tests pass against the final production frontend (22.7 seconds):

- Project filters, case-study dialogs, Escape and Ctrl+K navigation.
- Contact field validation and a real API submission.
- Overflow checks at 320, 375, 430, 768, 1024, 1280, 1440 and 1920 pixels, plus mobile navigation.
- Graceful contact API failure with a direct-email fallback.

The real browser submission was verified directly in PostgreSQL with status `NEW`. Only the two exact automated test messages were removed after verification.

## Visual and artifact checks

- Final desktop/mobile and section screenshots are in `output/preview/`.
- Production browser inspection reports no page exceptions, console errors or hydration warnings.
- Role text remains visible with reduced motion enabled; font assets are self-hosted.
- The CV is one page, text-validated, visually reviewed after the final content update, and downloads with HTTP 200.
- GramaLink's API case study contains the repository's Java, JavaFX, TCP socket and PostgreSQL stack.

Browser testing used Microsoft Edge with emulated viewport sizes. Physical-device testing and Lighthouse measurement have not been performed. Public hosting is not configured; the complete system is running locally through Docker.
