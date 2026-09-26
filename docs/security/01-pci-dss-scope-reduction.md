# PCI-DSS Scope Reduction Strategy

## Strategy Summary

To minimize PCI-DSS audit overhead and eliminate data breach liability:

1. **SAQ A / SAQ A-EP Target**:
   - Web checkout forms do not transmit raw PAN or CVV to BuimbPay core servers.
   - Elements are hosted in isolated iframes or direct SDK tokenisation with banking providers.

2. **Network Tokenisation**:
   - Provider tokens (`cardToken`) and card metadata (`cardBrand`, `cardLast4`, `cardExpMonth`, `cardExpYear`) are persisted for merchant transaction history.
   - 16-digit primary account numbers (PAN) are never stored in any database column.

3. **API Key Security**:
   - API Secret Keys (`bp_live_...`, `bp_test_...`) are shown exactly once at generation time.
   - Only a SHA-256 hash (`keyHash`) and an 8-character prefix (`keyPrefix`) are stored in the database.
