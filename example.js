import { checkPasswordBreach } from "pswder";
import crypto from "crypto";

(async () => {
  const result = await checkPasswordBreach("password123");
  console.log(result);
  // Output:
  // {
  //   isBreached: true,
  //   message: "This password has been found in a breach. Avoid reusing this password for email or sensitive accounts."
  // }
})();
