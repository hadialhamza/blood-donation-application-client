export const getAuthErrorMessage = (error) => {
  if (!error) return "An unknown error occurred.";

  const code = error.code || error.message;

  // Firebase Auth Errors
  if (
    code.includes("auth/user-not-found") ||
    code.includes("auth/invalid-credential")
  ) {
    return "Incorrect email or password. Please try again.";
  }
  if (code.includes("auth/wrong-password")) {
    return "Incorrect password. Please try again.";
  }
  if (code.includes("auth/email-already-in-use")) {
    return "This email is already registered. Please login instead.";
  }
  if (code.includes("auth/weak-password")) {
    return "Password should be at least 6 characters.";
  }
  if (code.includes("auth/invalid-email")) {
    return "Please enter a valid email address.";
  }
  if (code.includes("auth/too-many-requests")) {
    return "Too many failed attempts. Please try again later.";
  }
  if (code.includes("auth/network-request-failed")) {
    return "Network error. Please check your internet connection.";
  }

  // Generic fallback if it's just a simple string message
  return error.message || "Something went wrong. Please try again.";
};
