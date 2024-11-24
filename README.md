# PSWDER

A lightweight, developer-friendly NPM package for validating password strength and checking if a password has been breached. Ideal for email authentication systems or any application requiring secure password validation.

---

## Features

- **Strength Validation**:
  - Categorizes passwords as **Weak**, **Moderate**, or **Strong**.
  - Provides actionable suggestions to enhance password security.
  
- **Breach Check**:
  - Uses the [Have I Been Pwned API](https://haveibeenpwned.com/) to check if a password exists in known breaches.
  - Implements the k-anonymity model to maintain user privacy.

- **Lightweight**:
  - No unnecessary dependencies.
  - Only relies on native Node.js modules for most use cases.

---

## Installation

```bash
npm install pswder
```

## Usage

### 1. Validate Password Strength

```javascript
const { validatePassword } = require("pswder");

const result = validatePassword("My$ecure123");
console.log(result);
// Output:
// {
//   strength: "Strong",
//   suggestions: ["Your password is strong! No changes needed."]
// }
```

### 2. Check Password Breach

```javascript
const { checkPasswordBreach } = require("pswder");

(async () => {
  const result = await checkPasswordBreach("password123");
  console.log(result);
  // Output:
  // {
  //   isBreached: true,
  //   message: "This password has been found in a breach. Avoid reusing this password for email or sensitive accounts."
  // }
})();
```

## API Reference

### `validatePassword(password)`

**Validates the strength of a password.**

---

#### **Parameters**

- `password` _(string)_: The password to validate.

---

#### **Returns**

An object containing:

- `strength` _(string)_: Categorized as one of:
  - `Weak`: Missing multiple requirements or very short.
  - `Moderate`: Meets some requirements but lacks key security features.
  - `Strong`: Meets all or most security requirements.

- `suggestions` _(array)_: A list of actionable suggestions to enhance the password's strength.

---

#### **Example**

```javascript
const { validatePassword } = require("pswder");

const result = validatePassword("WeakPass");
console.log(result);
// Output:
// {
//   strength: "Weak",
//   suggestions: [
//     "Password should be at least 8 characters long.",
//     "Add at least one special character (e.g., !, @, #, $).",
//     "Add at least one numeric digit (e.g., 1, 2, 3)."
//   ]
// }
```

---

### `checkPasswordBreach(password)`

Checks if a password is present in known data breaches.

---

#### **Parameters:**

- `password` _(string)_: The password to check.

---

#### **Returns**

- `isBreached` (boolean): Whether the password  has been found in a breach.

- `message` (string): Details about the breach status.

---

## Why Choose pswder?

- **Lightweight and Simple**: Designed to be fast and easy to integrate into any project with minimal dependencies.

- **Strong Security Features**: Validates password strength with actionable feedback and checks for breaches using a privacy-focused API.

- **Developer-Friendly**: Clean API design with clear outputs to enhance user experience in authentication systems.

- **Privacy-Focused**: Implements the k-anonymity model for breach checks, ensuring that sensitive password data is not exposed.

- **Versatile**: Works seamlessly in both frontend and backend environments.

- **Customizable**: Provides meaningful suggestions to improve passwords, helping developers enforce strong security practices.

Choose **pswder** for secure, efficient, and lightweight password validation in your applications!

---

## Contributing

Contributions are welcome! If you encounter any issues or have feature suggestions:

1. Fork the repository.

2. Create a new branch for your feature/bugfix.

3. Submit a pull request.

## License

This project is licensed under the [Apache-2.0 License](./LICENSE).

---

## Author

Developed by [**Subhadeep Roy**](https://mvp-subha.me).  
