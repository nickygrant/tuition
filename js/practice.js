/* Interactive practice widget — "state the next correct line".
   Data-driven: window.PRACTICE_DATA = { subject, board, examStyle?, problems:[...] }.
   Problem: { id, title, tags:[], marks?, paper?, stem,
              steps:[ { prompt, scheme?, marks?, options:[ {html, correct, feedback} ] } ],
              solution }
   - Each question is a collapsible card (<details>); the first is open.
   - examStyle: the next line is revealed only after the current one is answered, so the
     working builds up like an exam answer.
   - "Mark" (only) grades every step at once: marks the correct line, flags the student's wrong
     pick, awards Edexcel-style M1/A1 marks per line, shows feedback and a "Y / N marks" total.
   - KaTeX: rendering waits until the library is available, then renders, and re-renders a card
     when its dropdown opens and once more on window load (robust against CDN/refresh races).
   Backward compatible: pages without marks/examStyle behave as a simple all-at-once quiz. */
(function () {
  "use strict";
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }

  function problemMarks(p) {
    if (p.marks != null) return p.marks;
    var t = 0, has = false;
    (p.steps || []).forEach(function (s) { if (s.marks != null) { t += s.marks; has = true; } });
    return has ? t : 0;
  }

  function build() {
    var root = document.getElementById("practice");
    if (!root || typeof window.PRACTICE_DATA === "undefined") return;
    var data = window.PRACTICE_DATA, exam = data.examStyle === true;

    (data.problems || []).forEach(function (p, pi) {
      var card = el("details", "pr-card" + (exam ? " pr-exam" : ""));
      card.id = "pr-" + (p.id || ("p" + (pi + 1)));
      if (pi === 0) card.setAttribute("open", "");

      var sum = el("summary", "pr-sum");
      var main = el("div", "pr-sum-main");
      main.appendChild(el("span", "pr-sum-title", (pi + 1) + ". " + (p.title || "")));
      var meta = el("div", "pr-sum-meta");
      (p.tags || []).forEach(function (t) { meta.appendChild(el("span", "pr-tag", t)); });
      var tm = problemMarks(p);
      if (tm) meta.appendChild(el("span", "pr-marks-badge", "(" + tm + " mark" + (tm === 1 ? "" : "s") + ")"));
      main.appendChild(meta);
      sum.appendChild(main);
      sum.appendChild(el("span", "pr-caret", "")); // chevron via CSS
      card.appendChild(sum);

      var body = el("div", "pr-body");
      if (p.paper) body.appendChild(el("p", "pr-paper", p.paper));
      if (p.stem) body.appendChild(el("div", "pr-stem", p.stem));

      var multi = (p.steps || []).length > 1;
      var stepsWrap = el("div", "pr-steps");
      (p.steps || []).forEach(function (step, si) {
        var sd = el("div", "pr-step" + (exam && si > 0 ? " pr-locked" : ""));
        sd.setAttribute("data-i", si);
        var prow = el("div", "pr-prompt-row");
        var prompt = step.prompt || (multi ? "Choose the correct next line." : "Choose the correct answer.");
        prow.appendChild(el("p", "pr-prompt", (multi ? ("Line " + (si + 1) + ". ") : "") + prompt));
        if (step.scheme) {
          var smk = (step.marks != null) ? step.marks : 1;
          prow.appendChild(el("span", "pr-scheme", step.scheme + " · " + smk + " mark" + (smk === 1 ? "" : "s")));
        }
        sd.appendChild(prow);
        var opts = el("div", "pr-opts");
        step.options.forEach(function (o, oi) {
          var b = el("button", "pr-opt");
          b.type = "button";
          b.setAttribute("data-opt", oi);
          b.setAttribute("aria-pressed", "false");
          b.innerHTML = '<span class="pr-opt-mark" aria-hidden="true"></span><span class="pr-opt-body">' + o.html + "</span>";
          b.addEventListener("click", function (ev) {
            if (ev && ev.preventDefault) ev.preventDefault();
            if (card.classList.contains("marked")) return;
            opts.querySelectorAll(".pr-opt").forEach(function (x) { x.classList.remove("sel"); x.setAttribute("aria-pressed", "false"); });
            b.classList.add("sel"); b.setAttribute("aria-pressed", "true");
            if (exam) {
              var nx = sd.nextElementSibling;
              if (nx && nx.classList && nx.classList.contains("pr-step")) nx.classList.remove("pr-locked");
            }
          });
          opts.appendChild(b);
        });
        sd.appendChild(opts);
        sd.appendChild(el("div", "pr-fb"));
        stepsWrap.appendChild(sd);
      });
      body.appendChild(stepsWrap);

      var act = el("div", "pr-actions");
      var mark = el("button", "pr-btn pr-mark", "Mark"); mark.type = "button";
      var reset = el("button", "pr-btn pr-reset", "Reset"); reset.type = "button";
      var score = el("span", "pr-score", "");
      score.setAttribute("role", "status"); score.setAttribute("aria-live", "polite");
      act.appendChild(mark); act.appendChild(reset); act.appendChild(score);
      body.appendChild(act);

      if (p.solution) {
        var sol = el("details", "pr-sol");
        sol.appendChild(el("summary", null, "Show full worked solution"));
        sol.appendChild(el("div", "pr-sol-body", p.solution));
        body.appendChild(sol);
      }

      mark.addEventListener("click", function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); grade(card, p, score); });
      reset.addEventListener("click", function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); resetCard(card, p, score, exam); });
      card.appendChild(body);
      root.appendChild(card);
    });

    // re-typeset a card's maths when its dropdown is opened (covers cards closed at build)
    root.addEventListener("toggle", function (e) {
      var c = e.target;
      if (c && c.classList && c.classList.contains("pr-card") && c.open) typeset(c);
    }, true);

    renderWhenReady(root);
  }

  function grade(card, p, score) {
    var steps = card.querySelectorAll(".pr-step");
    var correctSteps = 0, totalSteps = steps.length, gotMarks = 0, totMarks = 0, hasMarks = false;
    steps.forEach(function (sd, si) {
      var step = p.steps[si];
      var stepMarks = (step.marks != null) ? step.marks : 0;
      if (step.marks != null) hasMarks = true;
      totMarks += stepMarks;
      var fb = sd.querySelector(".pr-fb");
      var sel = sd.querySelector(".pr-opt.sel");
      sd.classList.remove("pr-locked");
      sd.querySelectorAll(".pr-opt").forEach(function (b) {
        var oi = +b.getAttribute("data-opt");
        if (step.options[oi].correct) b.classList.add("is-correct");
        if (b.classList.contains("sel") && !step.options[oi].correct) b.classList.add("is-wrong");
      });
      var ok = false;
      if (sel) {
        var oi = +sel.getAttribute("data-opt");
        var o = step.options[oi];
        if (o.correct) { ok = true; correctSteps++; gotMarks += stepMarks; fb.innerHTML = '<span class="ok">&#10003; Correct.</span> ' + (o.feedback || ""); }
        else { fb.innerHTML = '<span class="no">&#10007; Not quite.</span> ' + (o.feedback || ""); }
      } else {
        var cor = step.options.filter(function (x) { return x.correct; })[0];
        fb.innerHTML = '<span class="no">&#8212;</span> No line chosen. ' + (cor && cor.feedback ? cor.feedback : "");
      }
      fb.classList.add("show");
      var chip = sd.querySelector(".pr-scheme");
      if (chip && step.scheme) {
        chip.classList.add(ok ? "earned" : "lost");
        chip.innerHTML = step.scheme + " · " + (ok ? stepMarks : 0) + "/" + stepMarks + (ok ? " &#10003;" : " &#10007;");
      }
    });
    card.classList.add("marked");
    if (hasMarks) {
      score.innerHTML = "You scored <b>" + gotMarks + " / " + totMarks + "</b> marks";
      score.className = "pr-score " + (gotMarks === totMarks ? "all" : (gotMarks === 0 ? "none" : "some"));
    } else {
      score.textContent = correctSteps + " / " + totalSteps + " correct";
      score.className = "pr-score " + (correctSteps === totalSteps ? "all" : "some");
    }
    typeset(card);
  }

  function resetCard(card, p, score, exam) {
    card.classList.remove("marked");
    card.querySelectorAll(".pr-opt").forEach(function (b) { b.classList.remove("sel", "is-correct", "is-wrong"); b.setAttribute("aria-pressed", "false"); });
    card.querySelectorAll(".pr-fb").forEach(function (f) { f.classList.remove("show"); f.innerHTML = ""; });
    card.querySelectorAll(".pr-step").forEach(function (sd, si) {
      var step = p.steps[si];
      if (exam && si > 0) sd.classList.add("pr-locked");
      var chip = sd.querySelector(".pr-scheme");
      if (chip && step && step.scheme) {
        chip.classList.remove("earned", "lost");
        var smk = (step.marks != null) ? step.marks : 1;
        chip.innerHTML = step.scheme + " · " + smk + " mark" + (smk === 1 ? "" : "s");
      }
    });
    score.textContent = ""; score.className = "pr-score";
  }

  function typeset(node) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(node, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "\\[", right: "\\]", display: true },
            { left: "\\(", right: "\\)", display: false }
          ], throwOnError: false
        });
      } catch (e) {}
    }
  }

  function renderWhenReady(node) {
    var tries = 0;
    (function go() {
      if (window.renderMathInElement) { typeset(node); }
      else if (tries++ < 80) { setTimeout(go, 100); }
    })();
    window.addEventListener("load", function () { typeset(node); });
  }

  if (document.readyState !== "loading") build();
  else document.addEventListener("DOMContentLoaded", build);
})();
