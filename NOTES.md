# GitHub Actions - Hamne Kya Kiya

## 1. Dependencies Install Ki
```
npm install
```
Pehle humne project ki saari dependencies install ki. Kuch vulnerabilities thi but kaam chal gaya.

## 2. Tests Chalaye
```
npm test
```
`MainContent.test.jsx` mein 2 tests the — dono pass ho gaye. Sab theek tha.

## 3. Workflow File Check Ki
`.github/workflows/test.yml` dekhi. Usme teen problems thi:
- `actions/checkout@v2` purana tha (v4 hona chahiye tha)
- `runs-on: macos-latest` slow aur expensive hai
- `actions/setup-node` missing tha

## 4. Checkout Step Hataya (Galti)
User ne kaha checkout remove karo — humne hata diya. Yeh baad mein problem bani.

## 5. Git Setup Kiya
```
git init
git add .
git commit -m "2nd Workflow"
```
`02 Starting Project` folder mein naya git repo banaya aur pehla commit kiya.

## 6. Remote Add Kiya
```
git remote add origin https://github.com/hamzailyas434/gh-second-action.git
```

## 7. Push Mein Problems Aaye
Kai issues aaye push karte waqt:
- **403 Error** — wrong GitHub account (`HamzaIlyas42` vs `hamzailyas434`)
- **workflow scope missing** — PAT mein workflow permission nahi thi
- **Purana token cached tha** — keychain mein old credentials the

## 8. PAT Fix Kiya
GitHub pe jaake PAT mein `workflow` scope add ki, phir remote URL mein token embed kiya:
```
git remote set-url origin https://hamzailyas434:<TOKEN>@github.com/hamzailyas434/gh-second-action.git
```

## 9. Push Success Hua
```
git push -u origin main
```
Finally push ho gaya!

## 10. Workflow Fail Hua (Checkout Wali Galti)
GitHub Actions pe error aaya:
```
npm error enoent Could not read package.json
```
Kyunki humne checkout step hata di thi — runner ke paas code hi nahi tha.

## 11. Checkout Step Wapas Daali
`actions/checkout@v4` wapas add kiya aur push kiya — ab workflow sahi chal raha hai.

---
**Seekh:** Checkout step zaroor honi chahiye, warna runner ke paas code nahi hota!
