// Contact form configuration. No backend exists for this static site, so the
// form posts to a no-backend form service instead.
//
// To enable real submissions:
//   1. Get a free access key from https://web3forms.com (no signup email
//      verification needed beyond the key) or https://formspree.io.
//   2. Set FORM_KEY below.
//   3. If using Formspree instead of Web3Forms, set FORM_SERVICE to
//      "formspree" and FORM_KEY to your form id (the part after /f/ in your
//      Formspree endpoint).
//
// While FORM_KEY is empty, the contact form never attempts a network
// request — it falls back to a plain mailto link so nothing is ever faked
// as "sent" when it wasn't.
const CONFIG = {
    FORM_SERVICE: "web3forms", // "web3forms" | "formspree"
    FORM_KEY: ""
};
