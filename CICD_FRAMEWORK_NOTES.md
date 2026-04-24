# Factory42 — CI/CD Framework Samajhna

## Kya Chahte Hain?

Factory42 chahta hai ke **har project ka CI/CD pipeline same tarike se kaam kare** — koi bhi naya project shuru karo, sirf ek chhoti config file likho aur pipeline ready.

Abhi problem yeh hai ke har team apna YAML khud copy-paste karti hai — sab alag alag. Is framework se yeh theek hoga.

---

## Do Main Cheezein

### 1. `base-setup.json` — Organization ka Master Config
> Platform Engineering team maintain karti hai — koi team change nahi karti

Isme sab kuch defined hai jo **har project pe apply hoga:**

| Cheez | Value |
|-------|-------|
| Package Manager | `pnpm` |
| Node Version | `20-lts` |
| Language | TypeScript (mandatory) |
| Default Framework | Next.js |
| Docker Registry | `ghcr.io/factory42` |
| Hosting | Vercel (primary) |
| Database | Supabase (PostgreSQL) |
| Security Scan | GitHub CodeQL |
| Test Coverage | Minimum 80% |
| Secrets Rotation | Har 90 din mein |

---

### 2. `project-setup.json` — Har Project ka Apna Config
> Sirf yeh file har team likhti hai — choti hoti hai

Isme sirf **project ki unique cheezein** likhni hain:

```json
{
  "extends": "./base-setup.json",   // base se sab inherit karo
  "project": {
    "name": "customer-portal",
    "criticality": "high"
  },
  "stages": {
    "dev": { ... },
    "staging": { ... },
    "prod": { ... }
  }
}
```

---

## Stages — 4 Variants

Har project apni **risk profile** ke hisaab se stages choose karta hai:

```
1. Dev → Staging → Prod    (Customer-facing, revenue-critical apps)
2. Dev → Prod              (Internal tools)
3. Staging → Prod          (Stable content services)
4. Prod only               (PoCs, lightweight utilities)
```

**Customer Portal** ne teen stages choose ki hain: `dev` + `staging` + `prod`

---

## Pipeline — 10 Steps

```
Push hota hai
    ↓
1.  Lint + Typecheck
2.  Unit Tests (coverage > 80%)
3.  Security Scan (CodeQL)
4.  Docker Image Build
5.  Push to Registry (ghcr.io)
    ↓
6.  Deploy to Dev (auto - push pe)
7.  DB Migrations run
8.  Smoke Tests (/health check)
    ↓
9.  Deploy to Staging (manual - tech leads approve)
    ↓
10. Deploy to Prod (manual - release managers approve + release tag required)
```

---

## Stage Triggers

| Stage | Trigger | Approvers |
|-------|---------|-----------|
| **Dev** | Automatic — har push pe | Koi nahi |
| **Staging** | Manual | `@factory42/tech-leads` |
| **Prod** | Manual + Release Tag | `@factory42/release-managers` |

---

## Secrets Management

- Secrets **Vercel encrypted** mein store honge
- **Prod mein plain text env files allowed nahi**
- Har 90 din mein rotate karni hain
- `SUPABASE_SERVICE_ROLE_KEY` frontend pe kabhi nahi jaegi

**Customer Portal ke extra secrets:**
- `STRIPE_SECRET_KEY`
- `SENDGRID_API_KEY`

---

## Observability (Monitoring)

| Cheez | Tool |
|-------|------|
| Error Tracking | Sentry |
| Logs | Axiom (30 din retention) |
| Uptime Monitoring | Checkly (har 60 sec check) |
| Health Endpoint | `/health` |

Customer Portal ne uptime probe **30 sec** kar di (default 60 sec) — kyunki revenue-critical hai.

---

## Security & GDPR

- TLS minimum version: **1.3**
- Encryption at rest: **AES-256**
- Data EU mein rahega: **eu-central-1**
- GDPR: Right to erasure, consent layer, DPA required
- Admins ke liye **MFA mandatory**

---

## Customer Portal — Kya Override Kiya?

Base mein test coverage 80% thi — Customer Portal ne **98%** kar di (high criticality hai).
E2E tests base mein off the — Customer Portal ne **on** kar diye.
Uptime probe 60 sec thi — **30 sec** kar di.

---

## Summary — Hamara Kaam Kya Hai?

Agar hum is framework pe koi project banana chahein toh:

1. `project-setup.json` banao apne repo mein
2. `base-setup.json` se extend karo
3. Stages decide karo (dev/staging/prod)
4. Secrets add karo jo tumhare project ke liye unique hain
5. Pipeline automatically same steps follow karegi

**Koi naya YAML likhne ki zaroorat nahi — sirf config!**
