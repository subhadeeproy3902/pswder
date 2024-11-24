/**
 * Validates the strength of a password and provides suggestions for improvement.
 * Strength Categories:
 * - Weak: Missing multiple requirements or very short.
 * - Moderate: Meets some requirements but lacks key security features.
 * - Strong: Meets all or most requirements.
 *
 * @param {string} password - The password to validate.
 * @returns {Object} - An object with password strength and suggestions.
 */

export function validatePassword(password) {
  const suggestions = [];
  const minLength = 8;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const digitRegex = /\d/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;

  let strengthScore = 0;

  // Check minimum length
  if (password.length >= minLength) {
    strengthScore += 1;
  } else {
    suggestions.push(`Password should be at least ${minLength} characters long.`);
  }

  // Check for special characters
  if (specialCharRegex.test(password)) {
    strengthScore += 1;
  } else {
    suggestions.push("Add at least one special character (e.g., !, @, #, $).");
  }

  // Check for numeric digits
  if (digitRegex.test(password)) {
    strengthScore += 1;
  } else {
    suggestions.push("Add at least one numeric digit (e.g., 1, 2, 3).");
  }

  // Check for uppercase letters
  if (uppercaseRegex.test(password)) {
    strengthScore += 1;
  } else {
    suggestions.push("Add at least one uppercase letter (e.g., A, B, C).");
  }

  // Check for lowercase letters
  if (lowercaseRegex.test(password)) {
    strengthScore += 1;
  } else {
    suggestions.push("Add at least one lowercase letter (e.g., a, b, c).");
  }

  // Determine strength category
  let strengthCategory;
  if (strengthScore <= 2) {
    strengthCategory = "Weak";
  } else if (strengthScore === 3 || strengthScore === 4) {
    strengthCategory = "Moderate";
  } else {
    strengthCategory = "Strong";
  }

  return {
    strength: strengthCategory,
    suggestions: suggestions.length > 0 ? suggestions : ["Your password is strong! No changes needed."],
  };
}

/**
 * Checks if the password is present in a known breach database.
 * Uses the Have I Been Pwned API's k-anonymity model.
 *
 * @param {string} password - The password to check.
 * @returns {Promise<Object>} - Breach result and suggestions for improvement.
 */
export async function checkPasswordBreach(password) {
  const crypto = require("crypto");
  const sha1 = crypto.createHash("sha1").update(password).digest("hex").toUpperCase();
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5);

  try {
    // Use fetch to call the API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
      throw new Error("Failed to fetch breach data.");
    }

    const data = await response.text();
    const matches = data.split("\n").find((line) => line.startsWith(suffix));

    return {
      isBreached: !!matches,
      message: !!matches
        ? "This password has been found in a breach. Avoid reusing this password for email or sensitive accounts."
        : "This password is safe from known breaches.",
    };
  } catch (error) {
    return {
      isBreached: false,
      message: "Could not check for breaches. Please try again later.",
    };
  }
}
