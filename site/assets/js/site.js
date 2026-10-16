/* Vitridata — small progressive enhancements. The site works without JavaScript. */
(function () {
  "use strict";

  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // Language switcher keeps the section anchor (e.g. /en/services/#cloud -> /pt-br/servicos/#cloud)
  document.querySelectorAll(".lang a, .footer-bottom a[hreflang]").forEach(function (a) {
    a.addEventListener("click", function () {
      if (location.hash && a.getAttribute("href").indexOf("#") === -1) a.setAttribute("href", a.getAttribute("href") + location.hash);
    });
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Contact form
  var form = document.getElementById("contact-form");
  if (!form) return;
  var pt = form.dataset.lang === "pt";
  var M = pt ? {
    required: "Preencha este campo.",
    email: "Informe um e-mail válido, por exemplo nome@empresa.com.",
    select: "Escolha uma opção.",
    short: "Conte um pouco mais (pelo menos 20 caracteres).",
    fix: "Revise os campos destacados.",
    sending: "Enviando…",
    ok: "Mensagem enviada. Obrigado! Responderemos em breve.",
    fail: "Não foi possível enviar agora. Escreva para ",
    mail: "Abrimos o seu aplicativo de e-mail com a mensagem pronta. Se nada abriu, escreva para ",
    subject: "Contato pelo site",
    labels: { name: "Nome", email: "E-mail", company: "Empresa", service: "Serviço", message: "Projeto" }
  } : {
    required: "Please fill in this field.",
    email: "Please enter a valid email, for example name@company.com.",
    select: "Please choose an option.",
    short: "Please tell us a bit more (at least 20 characters).",
    fix: "Please review the highlighted fields.",
    sending: "Sending…",
    ok: "Message sent. Thank you! We will get back to you soon.",
    fail: "We couldn't send your message right now. Please email ",
    mail: "We opened your email app with the message ready to send. If nothing opened, email ",
    subject: "Website inquiry",
    labels: { name: "Name", email: "Email", company: "Company", service: "Service", message: "Project" }
  };
  var status = document.getElementById("form-status");
  var emailTo = form.dataset.email;
  var endpoint = form.dataset.endpoint;

  // Preselect service from ?service=
  var q = new URLSearchParams(location.search).get("service");
  if (q && form.service.querySelector('option[value="' + q.replace(/[^a-z]/g, "") + '"]')) form.service.value = q;

  function setStatus(cls, html) {
    status.className = "form-status " + cls;
    status.innerHTML = html;
  }
  function validate(el) {
    var msg = "";
    var v = el.value.trim();
    if (el.required && !v) msg = el.tagName === "SELECT" ? M.select : M.required;
    else if (el.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = M.email;
    else if (el.minLength > 0 && v.length < el.minLength) msg = M.short;
    var err = document.getElementById("e-" + el.id.slice(2));
    if (err) err.textContent = msg;
    el.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  }
  var fields = Array.prototype.filter.call(form.elements, function (el) { return el.required; });
  fields.forEach(function (el) {
    el.addEventListener("blur", function () { if (el.value) validate(el); });
    el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") validate(el); });
  });
  var mailLink = '<a href="mailto:' + emailTo + '">' + emailTo + "</a>.";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.website.value) return; // honeypot: silently ignore bots
    var bad = fields.filter(function (el) { return !validate(el); });
    if (bad.length) { setStatus("bad", M.fix); bad[0].focus(); return; }

    var data = {};
    ["name", "email", "company", "service", "message"].forEach(function (k) { data[k] = form[k].value.trim(); });
    data.service = form.service.options[form.service.selectedIndex].text;

    if (endpoint) {
      var b = form.querySelector("button[type=submit]");
      b.disabled = true;
      setStatus("info", M.sending);
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(Object.assign({ _subject: M.subject + " — " + data.company, _replyto: data.email, language: pt ? "pt-BR" : "en" }, data))
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        setStatus("ok", M.ok);
        status.focus();
      }).catch(function () {
        setStatus("bad", M.fail + mailLink);
      }).then(function () { b.disabled = false; });
      return;
    }

    // No form service configured: open a pre-filled email
    var body = Object.keys(M.labels).map(function (k) { return M.labels[k] + ": " + data[k]; }).join("\n\n");
    location.href = "mailto:" + emailTo + "?subject=" + encodeURIComponent(M.subject + " — " + data.company) + "&body=" + encodeURIComponent(body);
    setStatus("info", M.mail + mailLink);
  });
})();
