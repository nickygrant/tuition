/* ==========================================================================
   Dr Nicky Grant — on-brand pop-up chat widget
   --------------------------------------------------------------------------
   Self-contained, path-independent. Injects its own CSS, builds a floating
   launcher + chat panel, wires WhatsApp + Formspree email, and gates an
   optional Tawk.to live-chat upgrade.

   TWO LAYERS
   ----------
   1. Custom launcher + panel (works NOW, no signup needed):
        - "Chat on WhatsApp" deep link  -> notifies Nicky on WhatsApp
        - short message form -> Formspree fetch POST -> emails Nicky
   2. Live two-way upgrade (Tawk.to, free): set the constant below to a real
      Property ID and the widget swaps the custom panel for Tawk.to, which
      gives genuine on-site two-way chat (Nicky's reply appears in the chat)
      plus WhatsApp / email / app notifications.

   >>> SINGLE LINE TO GO LIVE WITH TWO-WAY CHAT <<<
   Replace the placeholder on the TAWK_PROPERTY_ID line just below with the
   Property ID from your free Tawk.to dashboard. See ../CHAT-SETUP.md.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- CONFIG ----------------------------------------------------------- */

  // Set this to your Tawk.to Property ID to enable full on-site two-way chat.
  // While it stays as the placeholder string, the custom WhatsApp + email
  // panel below is used instead.  e.g. "65f1a2b3c4d5e6f7a8b9c0d1/1htabcdef"
  const TAWK_PROPERTY_ID = "REPLACE_WITH_TAWK_PROPERTY_ID";

  const WHATSAPP_NUMBER = "447393352331";                       // no + or spaces
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvjanoz"; // emails Nicky
  const EMAIL = "nicky.L.grant@gmail.com";
  const WHATSAPP_GREETING =
    "Hi Nicky, I found you via drnickygrant.com and have a tuition enquiry:";

  /* ---- GUARDS ----------------------------------------------------------- */

  // Only run once, only in a real browser DOM.
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__ngChatLoaded) return;
  window.__ngChatLoaded = true;

  const wa = "https://wa.me/" + WHATSAPP_NUMBER;
  const mailto =
    "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Tuition enquiry via drnickygrant.com");

  /* ======================================================================
     LAYER 2 — Tawk.to live chat (only if a real Property ID is configured)
     ====================================================================== */
  function tawkConfigured() {
    return (
      typeof TAWK_PROPERTY_ID === "string" &&
      TAWK_PROPERTY_ID.indexOf("REPLACE_WITH_") === -1 &&
      TAWK_PROPERTY_ID.trim().length > 5
    );
  }

  function loadTawk() {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/" + TAWK_PROPERTY_ID;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }

  if (tawkConfigured()) {
    loadTawk();
    return; // Tawk.to provides its own launcher + two-way chat UI.
  }

  /* ======================================================================
     LAYER 1 — Custom on-brand launcher + panel (default, works now)
     ====================================================================== */

  /* ---- Brand tokens (scoped via the #ngchat wrapper) -------------------- */
  const T = {
    bg: "#102A2D",
    surface: "#163A3E",
    copper: "#C2924E",
    copperHover: "#E2C089",
    ivory: "#F3EFE7",
    muted: "#B8C3C0",
    line: "rgba(243,239,231,.13)",
    display: "'Space Grotesk',sans-serif",
    body: "'Inter',sans-serif"
  };

  const SESSION_KEY = "ngChatPanelClosed";

  function sessionGet(k) {
    try { return window.sessionStorage.getItem(k); } catch (e) { return null; }
  }
  function sessionSet(k, v) {
    try { window.sessionStorage.setItem(k, v); } catch (e) { /* private mode */ }
  }

  /* ---- Inject CSS ------------------------------------------------------- */
  function injectStyles() {
    const css = `
#ngchat, #ngchat * { box-sizing: border-box; }
#ngchat {
  position: fixed; right: clamp(14px, 4vw, 26px); bottom: clamp(14px, 4vw, 26px);
  z-index: 2147483000; font-family: ${T.body};
  -webkit-font-smoothing: antialiased;
}
#ngchat-launcher {
  display: flex; align-items: center; justify-content: center;
  width: 60px; height: 60px; border-radius: 50%; cursor: pointer;
  border: 1px solid ${T.line};
  background: linear-gradient(135deg, ${T.copper}, ${T.copperHover});
  color: ${T.bg}; box-shadow: 0 14px 38px rgba(0,0,0,.4);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}
#ngchat-launcher:hover { transform: translateY(-2px); box-shadow: 0 18px 46px rgba(0,0,0,.5); }
#ngchat-launcher:focus-visible { outline: 3px solid ${T.copperHover}; outline-offset: 3px; }
#ngchat-launcher svg { width: 28px; height: 28px; display: block; pointer-events: none; }
#ngchat-launcher .ng-ico-close { display: none; }
#ngchat[data-open="true"] #ngchat-launcher .ng-ico-chat { display: none; }
#ngchat[data-open="true"] #ngchat-launcher .ng-ico-close { display: block; }
#ngchat-badge {
  position: absolute; top: -3px; right: -3px; width: 15px; height: 15px;
  border-radius: 50%; background: ${T.copperHover}; border: 2px solid ${T.bg};
}
#ngchat[data-open="true"] #ngchat-badge { display: none; }

#ngchat-panel {
  position: absolute; right: 0; bottom: 74px;
  width: min(360px, calc(100vw - 2rem));
  max-height: min(560px, calc(100vh - 110px));
  display: none; flex-direction: column; overflow: hidden;
  background: ${T.bg}; color: ${T.ivory};
  border: 1px solid ${T.line}; border-radius: 18px;
  box-shadow: 0 26px 70px rgba(0,0,0,.55);
  opacity: 0; transform: translateY(10px) scale(.98);
  transition: opacity .2s ease, transform .2s ease;
}
#ngchat[data-open="true"] #ngchat-panel { display: flex; opacity: 1; transform: none; }

#ngchat-head {
  display: flex; align-items: center; gap: .7rem;
  padding: 1rem 1.05rem; background: ${T.surface};
  border-bottom: 1px solid ${T.line};
}
#ngchat-head .ng-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex: 0 0 auto;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, ${T.copper}, ${T.copperHover});
  color: ${T.bg}; font-family: ${T.display}; font-weight: 600; font-size: .95rem;
}
#ngchat-head .ng-htxt { line-height: 1.25; }
#ngchat-head .ng-htxt strong {
  display: block; font-family: ${T.display}; font-weight: 600;
  font-size: .98rem; color: ${T.ivory}; letter-spacing: -.01em;
}
#ngchat-head .ng-htxt span {
  display: inline-flex; align-items: center; gap: .35rem;
  font-size: .74rem; color: ${T.muted};
}
#ngchat-head .ng-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #4ec77f;
  box-shadow: 0 0 0 3px rgba(78,199,127,.18);
}
#ngchat-close {
  margin-left: auto; background: transparent; border: 0; cursor: pointer;
  color: ${T.muted}; padding: .35rem; border-radius: 8px; line-height: 0;
  transition: color .15s ease, background .15s ease;
}
#ngchat-close:hover { color: ${T.ivory}; background: rgba(243,239,231,.07); }
#ngchat-close:focus-visible { outline: 2px solid ${T.copperHover}; outline-offset: 2px; }
#ngchat-close svg { width: 18px; height: 18px; }

#ngchat-body {
  padding: 1.1rem 1.05rem 1.15rem; overflow-y: auto; flex: 1 1 auto;
}
#ngchat-greeting {
  background: ${T.surface}; border: 1px solid ${T.line};
  border-radius: 4px 14px 14px 14px; padding: .8rem .9rem; margin-bottom: 1rem;
  font-size: .9rem; line-height: 1.55; color: ${T.ivory};
}
#ngchat-greeting b { color: ${T.copperHover}; font-weight: 600; }

.ng-wa {
  display: flex; align-items: center; justify-content: center; gap: .55rem;
  width: 100%; padding: .8rem 1rem; margin-bottom: 1rem;
  background: #25D366; color: #07261a; text-decoration: none;
  border-radius: 11px; font-weight: 600; font-size: .92rem;
  font-family: ${T.display}; letter-spacing: -.01em;
  transition: filter .15s ease, transform .15s ease;
}
.ng-wa:hover { filter: brightness(1.06); transform: translateY(-1px); }
.ng-wa:focus-visible { outline: 3px solid ${T.copperHover}; outline-offset: 2px; }
.ng-wa svg { width: 20px; height: 20px; }

.ng-divider {
  display: flex; align-items: center; gap: .7rem;
  color: ${T.muted}; font-size: .72rem; letter-spacing: .12em;
  text-transform: uppercase; margin: 0 0 1rem;
}
.ng-divider::before, .ng-divider::after {
  content: ""; flex: 1; height: 1px; background: ${T.line};
}

#ngchat-form label { display: block; }
#ngchat-form .ng-field {
  width: 100%; background: ${T.surface}; color: ${T.ivory};
  border: 1px solid ${T.line}; border-radius: 10px;
  padding: .7rem .8rem; margin-bottom: .65rem;
  font-family: ${T.body}; font-size: .88rem; line-height: 1.5;
}
#ngchat-form .ng-field::placeholder { color: ${T.muted}; opacity: .85; }
#ngchat-form .ng-field:focus {
  outline: none; border-color: ${T.copper};
  box-shadow: 0 0 0 3px rgba(194,146,78,.2);
}
#ngchat-form textarea.ng-field { resize: vertical; min-height: 84px; }
#ngchat-form button.ng-send {
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  width: 100%; padding: .8rem 1rem; cursor: pointer;
  background: linear-gradient(135deg, ${T.copper}, ${T.copperHover});
  color: ${T.bg}; border: 0; border-radius: 11px;
  font-family: ${T.display}; font-weight: 600; font-size: .92rem;
  letter-spacing: -.01em; transition: filter .15s ease, transform .15s ease;
}
#ngchat-form button.ng-send:hover:not(:disabled) { filter: brightness(1.05); transform: translateY(-1px); }
#ngchat-form button.ng-send:disabled { opacity: .6; cursor: progress; }
#ngchat-form button.ng-send:focus-visible { outline: 3px solid ${T.copperHover}; outline-offset: 2px; }
.ng-send svg { width: 17px; height: 17px; }

.ng-note {
  margin: .8rem 0 0; font-size: .73rem; line-height: 1.5; color: ${T.muted};
}
.ng-note a { color: ${T.copperHover}; }

#ngchat-error {
  display: none; margin: 0 0 .7rem; padding: .55rem .75rem;
  background: rgba(224,85,85,.1); border: 1px solid rgba(224,85,85,.3);
  border-radius: 9px; color: #f0a3a3; font-size: .8rem; line-height: 1.5;
}
#ngchat-error a { color: ${T.copperHover}; font-weight: 600; }

#ngchat-success {
  display: none; text-align: center; padding: 1.6rem .6rem .8rem;
}
#ngchat-success .ng-check {
  width: 52px; height: 52px; margin: 0 auto .9rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; background: rgba(78,199,127,.14);
  border: 1px solid rgba(78,199,127,.4); color: #4ec77f;
}
#ngchat-success .ng-check svg { width: 26px; height: 26px; }
#ngchat-success strong {
  display: block; font-family: ${T.display}; font-weight: 600;
  font-size: 1.15rem; color: ${T.ivory}; margin-bottom: .45rem;
  letter-spacing: -.015em;
}
#ngchat-success p { font-size: .86rem; line-height: 1.6; color: ${T.muted}; margin: 0; }

@media (max-width: 420px) {
  #ngchat { right: 12px; bottom: 12px; }
  #ngchat-panel { bottom: 70px; }
}
@media (prefers-reduced-motion: reduce) {
  #ngchat *, #ngchat-launcher, #ngchat-panel { transition: none !important; }
  #ngchat-launcher:hover, .ng-wa:hover, #ngchat-form button.ng-send:hover { transform: none; }
}
`;
    const style = document.createElement("style");
    style.id = "ngchat-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---- Build DOM -------------------------------------------------------- */
  function build() {
    const root = document.createElement("div");
    root.id = "ngchat";
    root.setAttribute("data-open", "false");

    const waHref = wa + "?text=" + encodeURIComponent(WHATSAPP_GREETING);

    root.innerHTML = [
      // Panel
      '<section id="ngchat-panel" role="dialog" aria-modal="false" ',
      'aria-label="Chat with Dr Nicky Grant" aria-hidden="true">',

        '<header id="ngchat-head">',
          '<span class="ng-avatar" aria-hidden="true">NG</span>',
          '<span class="ng-htxt">',
            '<strong>Dr Nicky Grant</strong>',
            '<span><span class="ng-dot" aria-hidden="true"></span>Usually replies same day</span>',
          '</span>',
          '<button id="ngchat-close" type="button" aria-label="Close chat">',
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ',
            'stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
          '</button>',
        '</header>',

        '<div id="ngchat-body">',
          '<div id="ngchat-greeting">',
            'Hi, I’m <b>Nicky</b> — a Cambridge PhD economist and tutor. ',
            'Message me about A-Level, admissions, university or postgraduate ',
            'tuition and I’ll reply personally.',
          '</div>',

          '<a class="ng-wa" href="', waHref, '" target="_blank" rel="noopener" ',
          'id="ngchat-wa">',
            '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">',
            '<path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.8L.3 31.6l8-2.1c2.3 1.2 4.9 1.9 7.7 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.4c-2.5 0-4.9-.7-7-1.9l-.5-.3-4.7 1.2 1.3-4.6-.3-.5c-1.4-2.2-2.1-4.7-2.1-7.3C2.7 8.7 8.7 2.7 16 2.7S29.3 8.7 29.3 16 23.3 28.8 16 28.8zm7.3-9.6c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.3 1.5c-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.8-.6-.7-.9-.7h-.7c-.2 0-.6.1-1 .5s-1.3 1.3-1.3 3.2 1.4 3.7 1.5 3.9c.2.2 2.7 4.2 6.6 5.9.9.4 1.6.6 2.2.8.9.3 1.7.2 2.4.1.7-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.3-.3-.7-.5z"/></svg>',
            'Chat on WhatsApp',
          '</a>',

          '<div class="ng-divider">or send a message</div>',

          '<div id="ngchat-error" role="alert"></div>',

          '<form id="ngchat-form" novalidate>',
            '<input class="ng-field" type="text" name="name" autocomplete="name" ',
            'placeholder="Your name" aria-label="Your name" required>',
            '<input class="ng-field" type="email" name="email" autocomplete="email" ',
            'placeholder="Email address" aria-label="Email address" required>',
            '<textarea class="ng-field" name="message" rows="3" ',
            'placeholder="How can I help? (subject, level, deadline…)" ',
            'aria-label="Your message" required></textarea>',
            '<input type="hidden" name="_subject" ',
            'value="New chat message via drnickygrant.com">',
            '<input type="text" name="_gotcha" tabindex="-1" autocomplete="off" ',
            'style="position:absolute;left:-9999px" aria-hidden="true">',
            '<button class="ng-send" type="submit">',
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ',
              'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ',
              'aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>',
              'Send message',
            '</button>',
          '</form>',

          '<p class="ng-note">Prefer email? Write to ',
          '<a href="', mailto, '">', EMAIL, '</a>.</p>',

          '<div id="ngchat-success" role="status">',
            '<span class="ng-check" aria-hidden="true">',
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ',
              'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">',
              '<path d="M20 6 9 17l-5-5"/></svg>',
            '</span>',
            '<strong>Thank you</strong>',
            '<p>Your message has reached Nicky. You’ll get a reply by ',
            'email or WhatsApp shortly.</p>',
          '</div>',
        '</div>',
      '</section>',

      // Launcher
      '<button id="ngchat-launcher" type="button" aria-label="Open chat" ',
      'aria-expanded="false" aria-controls="ngchat-panel">',
        '<span id="ngchat-badge" aria-hidden="true"></span>',
        '<svg class="ng-ico-chat" viewBox="0 0 24 24" fill="none" ',
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ',
        'stroke-linejoin="round" aria-hidden="true">',
        '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        '<svg class="ng-ico-close" viewBox="0 0 24 24" fill="none" ',
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" ',
        'aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      '</button>'
    ].join("");

    document.body.appendChild(root);
    return root;
  }

  /* ---- Wire behaviour --------------------------------------------------- */
  function init() {
    injectStyles();
    const root = build();

    const launcher = root.querySelector("#ngchat-launcher");
    const panel = root.querySelector("#ngchat-panel");
    const closeBtn = root.querySelector("#ngchat-close");
    const form = root.querySelector("#ngchat-form");
    const errBox = root.querySelector("#ngchat-error");
    const successBox = root.querySelector("#ngchat-success");
    const firstField = form.querySelector('input[name="name"]');

    let isOpen = false;

    function openPanel() {
      isOpen = true;
      root.setAttribute("data-open", "true");
      launcher.setAttribute("aria-expanded", "true");
      launcher.setAttribute("aria-label", "Close chat");
      panel.setAttribute("aria-hidden", "false");
      // Move focus into the panel (first field, or WhatsApp link as fallback).
      const target = firstField || panel.querySelector("#ngchat-wa");
      if (target) {
        try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); }
      }
    }

    function closePanel(returnFocus) {
      isOpen = false;
      root.setAttribute("data-open", "false");
      launcher.setAttribute("aria-expanded", "false");
      launcher.setAttribute("aria-label", "Open chat");
      panel.setAttribute("aria-hidden", "true");
      sessionSet(SESSION_KEY, "1");
      if (returnFocus !== false) {
        try { launcher.focus({ preventScroll: true }); } catch (e) { launcher.focus(); }
      }
    }

    function togglePanel() { isOpen ? closePanel() : openPanel(); }

    launcher.addEventListener("click", togglePanel);
    closeBtn.addEventListener("click", function () { closePanel(); });

    // Esc closes when the panel (or anything inside it) has focus / is open.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) {
        e.stopPropagation();
        closePanel();
      }
    });

    // Simple focus trap so Tab stays within the open panel.
    panel.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !isOpen) return;
      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    /* ---- Formspree submit (emails Nicky) -------------------------------- */
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errBox.style.display = "none";

      const submitBtn = form.querySelector("button.ng-send");
      const data = new FormData(form);

      // Honeypot: silently succeed for bots.
      if (data.get("_gotcha")) { showSuccess(); return; }

      submitBtn.disabled = true;
      const original = submitBtn.innerHTML;
      submitBtn.innerHTML = "Sending…";

      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            showSuccess();
          } else {
            return res.json().then(
              function (j) {
                const msg =
                  j && j.errors && j.errors.length
                    ? j.errors.map(function (x) { return x.message; }).join(", ")
                    : "Something went wrong.";
                throw new Error(msg);
              },
              function () { throw new Error("Something went wrong."); }
            );
          }
        })
        .catch(function () {
          // Network/endpoint failure -> graceful mailto fallback.
          const name = (data.get("name") || "").toString();
          const email = (data.get("email") || "").toString();
          const message = (data.get("message") || "").toString();
          const body =
            "Name: " + name + "\nEmail: " + email + "\n\n" + message;
          const fallback =
            "mailto:" + EMAIL +
            "?subject=" + encodeURIComponent("Tuition enquiry via drnickygrant.com") +
            "&body=" + encodeURIComponent(body);
          errBox.innerHTML =
            "Sorry, the message could not be sent just now. Please " +
            '<a href="' + fallback + '">email Nicky directly</a> or use ' +
            "WhatsApp above.";
          errBox.style.display = "block";
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        });
    });

    function showSuccess() {
      form.style.display = "none";
      const note = root.querySelector(".ng-note");
      const divider = root.querySelector(".ng-divider");
      if (note) note.style.display = "none";
      errBox.style.display = "none";
      successBox.style.display = "block";
      if (divider) divider.style.display = "none";
    }

    // Non-intrusive: never auto-open. (We intentionally do NOT auto-open even
    // on first visit; sessionStorage simply records dismissal for parity with
    // the requirement and future tweaks.)
    void sessionGet(SESSION_KEY);
  }

  /* ---- Boot ------------------------------------------------------------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
