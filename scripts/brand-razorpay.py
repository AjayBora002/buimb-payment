import os

path = 'apps/checkout-portal/src/views/checkout.html'
if os.path.exists(path):
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    replacements = [
        ('YouPI PG Trusted Business', 'Razorpay Trusted Business'),
        ('YouPI PG Verified Business', 'Razorpay Verified Business'),
        ('200+ orders verified this month by YouPI PG', '200+ orders verified this month by Razorpay'),
        ('New to YOUPI PG? Please enter your name and email to proceed:', 'New to Razorpay Magic Checkout? Please enter your mobile number and name:'),
        ('Your payment was automatically verified by YouPI PG banking observers.', 'Your payment was automatically verified by Razorpay Banking Rails.'),
        ('Secured by YouPI PG & 256-Bit Bank Encryption', 'Secured by Razorpay & 256-Bit Bank Encryption'),
        ('Secured by YouPI PG &amp; 256-Bit Bank Encryption', 'Secured by Razorpay &amp; 256-Bit Bank Encryption'),
        ('YouPI PG Help &amp; Support', 'Razorpay Help &amp; Support'),
        ('YouPI PG Help & Support', 'Razorpay Help & Support'),
        ("b.appName || 'YouPI PG'", "b.appName || 'Razorpay'"),
        ("appName || 'YouPI PG'", "appName || 'Razorpay'"),
        ("'YouPI PG'", "'Razorpay'"),
        ('"YouPI PG"', '"Razorpay"'),
        ('YOUPI PG', 'RAZORPAY'),
        ('YouPI PG', 'Razorpay'),
        ('>YouPI<', '>Razorpay<'),
        ('YouPI Checkout', 'Razorpay Checkout'),
        ('YouPI Store', 'Razorpay Merchant Store'),
        ('YOUPI Store', 'Razorpay Merchant Store'),
    ]

    for old, new in replacements:
        c = c.replace(old, new)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)

    print('Updated checkout.html')

# Also update store.html in coin-wallet-store
store_path = 'apps/coin-wallet-store/src/store.html'
if os.path.exists(store_path):
    with open(store_path, 'r', encoding='utf-8') as f:
        sc = f.read()
    sc = sc.replace('YOUPI Store · Enterprise Payment Gateway Suite', 'Acme Store · Razorpay Standard Checkout')
    sc = sc.replace('YOUPI Store', 'Acme Store')
    sc = sc.replace('YOUPI PG', 'Razorpay')
    sc = sc.replace('YouPI PG', 'Razorpay')
    sc = sc.replace('YouPI', 'Razorpay')
    with open(store_path, 'w', encoding='utf-8') as f:
        f.write(sc)
    print('Updated store.html')

