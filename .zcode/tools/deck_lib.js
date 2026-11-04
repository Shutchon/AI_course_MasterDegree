// Shared design system for "Machine Learning with scikit-learn" course decks.
// Canvas: LAYOUT_WIDE 13.33 x 7.5 in. All option objects are factories (pptxgenjs mutates in place).
const pptxgen = require("pptxgenjs");

// ---------- palette (BACKGROUND -> PRIMARY -> ACCENT) ----------
const C = {
  BG_LIGHT: "FFFFFF",
  BG_DARK: "0B2B2E",       // deep teal-black: title / section / closing
  PANEL: "F1F5F9",         // light slate panel
  PRIMARY: "0D9488",       // teal 600
  PRIMARY_DARK: "115E59",
  PRIMARY_TINT: "CCFBF1",  // teal 100 (subtle card tint)
  PRIMARY_FAINT: "F0FDFA", // teal 50
  ACCENT: "F59E0B",        // amber — sparing, one focal element per slide
  ACCENT_TINT: "FEF3C7",
  TEXT: "1E293B",
  MUTED: "64748B",
  FAINT: "94A3B8",
  ON_DARK: "F8FAFC",
  MUTED_DARK: "8CA3A8",    // muted text on dark bg
  CODE_BG: "102A2E",       // code panel (echoes BG_DARK)
  CODE: "E2E8F0",
  CODE_COMMENT: "7C9AA0",
  CODE_KW: "7DD3C0",       // keyword-ish tint of primary
  CODE_STR: "FCD34D",
  OK: "0D9488",
  BAD: "E11D48",
};
const FONT = "Segoe UI";
const MONO = "Consolas";
const W = 13.33, H = 7.5, M = 0.55;
const COURSE = "Machine Learning with scikit-learn";

// ---------- deck ----------
function deckInit(title) {
  const p = new pptxgen();
  p.layout = "LAYOUT_WIDE";
  p.author = "Shutchon Premchaisawatt";
  p.title = title;
  return p;
}

// ---------- footer (content slides) ----------
function footer(slide, pres, pageNo, sessionTag) {
  slide.addText(COURSE, { x: M, y: 7.08, w: 5.5, h: 0.3, fontSize: 10, fontFace: FONT, color: C.FAINT, margin: 0 });
  slide.addText(`${sessionTag}  ·  ${pageNo}`, { x: W - M - 2, y: 7.08, w: 2, h: 0.3, fontSize: 10, fontFace: FONT, color: C.FAINT, align: "right", margin: 0 });
}

// ---------- content slide scaffold ----------
// kicker = small teal label above title; returns slide
function content(pres, { sessionTag, kicker, title, pageNo }) {
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };
  let y = 0.52;
  if (kicker) {
    s.addText(kicker.toUpperCase(), { x: M, y: 0.42, w: 9, h: 0.32, fontSize: 13, fontFace: FONT, bold: true, color: C.PRIMARY, charSpacing: 2, margin: 0 });
    y = 0.78;
  }
  s.addText(title, { x: M, y, w: W - 2 * M, h: 0.85, fontSize: 32, fontFace: FONT, bold: true, color: C.TEXT, margin: 0 });
  footer(s, pres, pageNo, sessionTag);
  return s;
}

// ---------- title slide (dark) ----------
function titleSlide(pres, { num, title, subtitle }) {
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };
  // oversized session number, right side
  s.addText(num, { x: 8.1, y: 1.15, w: 5.0, h: 4.6, fontSize: 300, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, align: "center", margin: 0 });
  s.addText(COURSE.toUpperCase(), { x: M, y: 1.7, w: 7.6, h: 0.4, fontSize: 15, fontFace: FONT, bold: true, color: C.ACCENT, charSpacing: 3, margin: 0 });
  s.addText(title, { x: M, y: 2.25, w: 7.6, h: 2.0, fontSize: 44, fontFace: FONT, bold: true, color: C.ON_DARK, margin: 0 });
  s.addText(subtitle, { x: M, y: 4.45, w: 7.2, h: 0.9, fontSize: 18, fontFace: FONT, color: C.MUTED_DARK, margin: 0 });
  s.addText("Instructor: Shutchon Premchaisawatt", { x: M, y: 6.28, w: 7.5, h: 0.4, fontSize: 15, fontFace: FONT, bold: true, color: C.ON_DARK, margin: 0 });
  s.addText("Master's Degree Program  ·  Hands-on with Google Colab", { x: M, y: 6.78, w: 7.5, h: 0.35, fontSize: 12, fontFace: FONT, color: C.MUTED_DARK, margin: 0 });
  return s;
}

// ---------- section divider (dark, used sparingly) ----------
function sectionSlide(pres, { sessionTag, label, pageNo }) {
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };
  s.addText(label.toUpperCase(), { x: M, y: 2.9, w: W - 2 * M, h: 1.2, fontSize: 40, fontFace: FONT, bold: true, color: C.ON_DARK, align: "center", margin: 0 });
  s.addText(sessionTag, { x: M, y: 2.35, w: W - 2 * M, h: 0.4, fontSize: 14, fontFace: FONT, bold: true, color: C.ACCENT, align: "center", charSpacing: 3, margin: 0 });
  footerDark(s, pageNo, sessionTag);
  return s;
}
function footerDark(s, pageNo, sessionTag) {
  s.addText(COURSE, { x: M, y: 7.08, w: 5.5, h: 0.3, fontSize: 10, fontFace: FONT, color: "56777B", margin: 0 });
  s.addText(`${sessionTag}  ·  ${pageNo}`, { x: W - M - 2, y: 7.08, w: 2, h: 0.3, fontSize: 10, fontFace: FONT, color: "56777B", align: "right", margin: 0 });
}

// ---------- styled bullets ----------
// items: string | {t, b(old), c(olor), sub}  — sub items indent
function bullets(slide, items, { x, y, w, h, size = 17, gap = 8, color = C.TEXT } = {}) {
  const bu = () => ({ code: "25B8", indent: 12, color: C.PRIMARY });
  const arr = [];
  items.forEach((it, i) => {
    const o = typeof it === "string" ? { t: it } : it;
    arr.push({
      text: o.t,
      options: {
        bullet: o.sub ? { code: "2013", indent: 10, color: C.FAINT } : bu(),
        indentLevel: o.sub ? 1 : 0,
        bold: !!o.b,
        color: o.c || (o.sub ? C.MUTED : color),
        breakLine: true,
      },
    });
  });
  slide.addText(arr, { x, y, w, h, fontSize: size, fontFace: FONT, paraSpaceAfter: gap, margin: 0, valign: "top" });
}

// ---------- card ----------
function card(slide, pres, { x, y, w, h, title, body, tint = C.PRIMARY_FAINT, titleColor = C.PRIMARY_DARK, bodySize = 14, titleSize = 16 }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: tint }, line: { color: "FFFFFF", width: 0 },
  });
  const parts = [];
  if (title) parts.push({ text: title, options: { bold: true, fontSize: titleSize, color: titleColor, breakLine: !!body, paraSpaceAfter: body ? 6 : 0 } });
  if (body) parts.push({ text: body, options: { fontSize: bodySize, color: C.TEXT, breakLine: false } });
  slide.addText(parts, { x: x + 0.25, y: y + 0.18, w: w - 0.5, h: h - 0.36, fontFace: FONT, valign: "top", margin: 0 });
}

// ---------- code block ----------
// lines: array of {t, c} or string; c = color hex. Supports leading-# comments in CODE_COMMENT.
function codeBlock(slide, pres, { x, y, w, h, lines, size = 13.5, title }) {
  const hNeed = lines.length * (size * 1.28 + 3) / 72 + 0.42 + (title ? 0.46 : 0);
  if (!h || h > hNeed) h = hNeed;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.09, fill: { color: C.CODE_BG }, line: { color: C.CODE_BG, width: 0 },
  });
  let ty = y;
  if (title) {
    slide.addText(title, { x: x + 0.28, y: y + 0.12, w: w - 0.56, h: 0.3, fontSize: 11, fontFace: FONT, bold: true, color: C.MUTED_DARK, margin: 0 });
    ty = y + 0.3;
  }
  const arr = lines.map((ln) => {
    const o = typeof ln === "string" ? { t: ln } : ln;
    const color = o.c || (o.t.trimStart().startsWith("#") ? C.CODE_COMMENT : C.CODE);
    return { text: o.t, options: { color, breakLine: true } };
  });
  slide.addText(arr, { x: x + 0.28, y: ty + 0.14, w: w - 0.56, h: h - (ty - y) - 0.28, fontSize: size, fontFace: MONO, paraSpaceAfter: 3, margin: 0, valign: "top" });
}

// ---------- console output block ----------
function outputBlock(slide, pres, { x, y, w, h, lines, size = 13 }) {
  const hNeed = lines.length * (size * 1.28 + 2) / 72 + 0.38;
  if (!h || h > hNeed) h = hNeed;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.07, fill: { color: C.PANEL }, line: { color: "E2E8F0", width: 1 },
  });
  const arr = lines.map((ln) => {
    const o = typeof ln === "string" ? { t: ln } : ln;
    return { text: o.t, options: { color: o.c || C.MUTED, bold: !!o.b, breakLine: true } };
  });
  slide.addText(arr, { x: x + 0.25, y: y + 0.12, w: w - 0.5, h: h - 0.24, fontSize: size, fontFace: MONO, paraSpaceAfter: 2, margin: 0, valign: "top" });
}

// ---------- horizontal flow (numbered steps) ----------
// steps: [{t, d}] title + short description; startNum for continuing numbering across rows
function flowRow(slide, pres, { x, y, w, h = 1.15, steps, fill = C.PRIMARY_TINT, numColor = C.PRIMARY_DARK, startNum = 1, numbered = true }) {
  const n = steps.length, gap = 0.28, bw = (w - gap * (n - 1)) / n;
  steps.forEach((st, i) => {
    const bx = x + i * (bw + gap);
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y, w: bw, h, rectRadius: 0.07, fill: { color: fill }, line: { color: "FFFFFF", width: 0 } });
    const runs = [];
    if (numbered) runs.push({ text: `${startNum + i}`, options: { bold: true, fontSize: 15, color: numColor, breakLine: true } });
    runs.push({ text: st.t, options: { bold: true, fontSize: 13, color: C.TEXT, breakLine: true } });
    if (st.d) runs.push({ text: st.d, options: { fontSize: 10.5, color: C.MUTED, breakLine: false } });
    slide.addText(runs, { x: bx + 0.14, y: y + 0.08, w: bw - 0.28, h: h - 0.16, fontFace: FONT, margin: 0, valign: "top", paraSpaceAfter: 2 });
    if (i < n - 1) slide.addText("→", { x: bx + bw - 0.055, y: y + h / 2 - 0.2, w: 0.4, h: 0.4, fontSize: 16, fontFace: FONT, color: C.PRIMARY, align: "center", margin: 0 });
  });
}

// ---------- big stat ----------
function bigStat(slide, { x, y, w, value, label, color = C.PRIMARY, size = 64 }) {
  slide.addText(value, { x, y, w, h: size / 72 + 0.35, fontSize: size, fontFace: FONT, bold: true, color, align: "center", margin: 0 });
  slide.addText(label, { x, y: y + size / 72 + 0.32, w, h: 0.75, fontSize: 14, fontFace: FONT, color: C.MUTED, align: "center", margin: 0 });
}

// ---------- key takeaways (dark) ----------
function takeaways(pres, { sessionTag, items, pageNo, nextTitle, nextTag }) {
  const s = pres.addSlide();
  s.background = { color: C.BG_DARK };
  s.addText("KEY TAKEAWAYS", { x: M, y: 0.55, w: 8, h: 0.4, fontSize: 14, fontFace: FONT, bold: true, color: C.ACCENT, charSpacing: 3, margin: 0 });
  const arr = [];
  items.forEach((t, i) => arr.push({
    text: `${i + 1}.  ${t}`,
    options: { color: C.ON_DARK, breakLine: true, bold: false },
  }));
  s.addText(arr, { x: M, y: 1.25, w: W - 2 * M, h: 4.6, fontSize: 18, fontFace: FONT, paraSpaceAfter: 14, margin: 0, valign: "top" });
  if (nextTitle) {
    s.addText([
      { text: "NEXT", options: { fontSize: 12, bold: true, color: C.ACCENT, charSpacing: 3, breakLine: true } },
      { text: `${nextTag} — ${nextTitle}`, options: { fontSize: 16, color: C.MUTED_DARK, breakLine: false } },
    ], { x: M, y: 6.05, w: W - 2 * M, h: 0.8, fontFace: FONT, margin: 0, paraSpaceAfter: 4 });
  }
  footerDark(s, pageNo, sessionTag);
  return s;
}

// ---------- lab slide ----------
function labSlide(pres, { sessionTag, pageNo, num, title, goal, tasks, vibe }) {
  const s = pres.addSlide();
  s.background = { color: C.BG_LIGHT };
  s.addText(`LAB ${num}  ·  DO IT IN GOOGLE COLAB`, { x: M, y: 0.45, w: 9, h: 0.32, fontSize: 13, fontFace: FONT, bold: true, color: C.ACCENT, charSpacing: 2, margin: 0 });
  s.addText(title, { x: M, y: 0.8, w: W - 2 * M, h: 0.75, fontSize: 30, fontFace: FONT, bold: true, color: C.TEXT, margin: 0 });
  // left: tasks card; right: goal + vibe coding
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M, y: 1.75, w: 7.3, h: 4.9, rectRadius: 0.09, fill: { color: C.PRIMARY_FAINT }, line: { color: "FFFFFF", width: 0 } });
  s.addText("YOUR MISSION (โจทย์ภาษาไทยใน Colab)", { x: M + 0.3, y: 1.98, w: 6.7, h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: C.PRIMARY_DARK, margin: 0 });
  bullets(s, tasks, { x: M + 0.3, y: 2.45, w: 6.7, h: 4.0, size: 15, gap: 9 });
  card(s, pres, { x: 8.25, y: 1.75, w: W - 8.25 - M, h: 2.1, title: "Learning goal", body: goal, tint: C.PANEL, titleColor: C.TEXT, bodySize: 13.5 });
  card(s, pres, { x: 8.25, y: 4.05, w: W - 8.25 - M, h: 2.6, title: "Vibe coding corner", body: vibe, tint: C.ACCENT_TINT, titleColor: "92400E", bodySize: 13.5 });
  footer(s, pres, pageNo, sessionTag);
  return s;
}

// ---------- agenda ----------
function agendaSlide(pres, { sessionTag, pageNo, title = "Today's agenda", items }) {
  const s = content(pres, { sessionTag, kicker: "Agenda", title, pageNo });
  const n = items.length;
  const colH = 5.3, yTop = 1.85;
  if (n <= 5) {
    items.forEach((it, i) => {
      const y = yTop + i * (colH / n);
      s.addText(String(i + 1).padStart(2, "0"), { x: M, y, w: 1.0, h: 0.75, fontSize: 30, fontFace: FONT, bold: true, color: C.PRIMARY, margin: 0 });
      s.addText([
        { text: it.t, options: { bold: true, fontSize: 17, color: C.TEXT, breakLine: !!it.d } },
        ...(it.d ? [{ text: it.d, options: { fontSize: 13, color: C.MUTED, breakLine: false } }] : []),
      ], { x: M + 1.15, y: y + 0.04, w: W - 2 * M - 1.3, h: colH / n - 0.1, fontFace: FONT, margin: 0, valign: "top" });
    });
  } else {
    const half = Math.ceil(n / 2), colW = (W - 2 * M - 0.6) / 2;
    items.forEach((it, i) => {
      const col = i < half ? 0 : 1, row = i < half ? i : i - half;
      const x = M + col * (colW + 0.6), y = yTop + row * (colH / half);
      s.addText(String(i + 1).padStart(2, "0"), { x, y, w: 0.85, h: 0.7, fontSize: 26, fontFace: FONT, bold: true, color: C.PRIMARY, margin: 0 });
      s.addText([
        { text: it.t, options: { bold: true, fontSize: 15.5, color: C.TEXT, breakLine: !!it.d } },
        ...(it.d ? [{ text: it.d, options: { fontSize: 12, color: C.MUTED, breakLine: false } }] : []),
      ], { x: x + 1.0, y: y + 0.03, w: colW - 1.0, h: colH / half - 0.1, fontFace: FONT, margin: 0, valign: "top" });
    });
  }
  return s;
}

// ---------- comparison table ----------
function compTable(slide, pres, { x, y, w, rows, colW, header = true, fontSize = 13, rowH = 0.42 }) {
  const data = rows.map((r, ri) => r.map((cell, ci) => {
    const o = typeof cell === "object" ? cell : { t: cell };
    return {
      text: o.t,
      options: {
        bold: header && ri === 0,
        color: o.c || (header && ri === 0 ? "FFFFFF" : C.TEXT),
        fill: { color: o.f || (header && ri === 0 ? C.PRIMARY_DARK : ri % 2 ? "FFFFFF" : C.PANEL) },
        align: o.a || (ci === 0 ? "left" : "left"),
        valign: "middle",
      },
    };
  }));
  slide.addTable(data, { x, y, w, colW, border: { pt: 0.75, color: "E2E8F0" }, fontFace: FONT, fontSize, rowH, margin: 0.07 });
}

// ---------- k-fold diagram ----------
// draws `k` rows of `k` cells; row i highlights fold i+1 as "validation"
function kfoldDiagram(slide, pres, { x, y, k = 5, cellW = 0.52, cellH = 0.4, gap = 0.06, labelW = 1.15, title }) {
  if (title) slide.addText(title, { x, y: y - 0.42, w: labelW + k * (cellW + gap), h: 0.35, fontSize: 13, fontFace: FONT, bold: true, color: C.TEXT, margin: 0 });
  for (let r = 0; r < k; r++) {
    slide.addText(`Split ${r + 1}`, { x, y: y + r * (cellH + gap), w: labelW, h: cellH, fontSize: 11, fontFace: FONT, color: C.MUTED, valign: "middle", margin: 0 });
    for (let c = 0; c < k; c++) {
      const isVal = c === r;
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + labelW + c * (cellW + gap), y: y + r * (cellH + gap), w: cellW, h: cellH, rectRadius: 0.04,
        fill: { color: isVal ? C.ACCENT : C.PRIMARY }, line: { color: "FFFFFF", width: 0 },
      });
      if (isVal) slide.addText("val", { x: x + labelW + c * (cellW + gap), y: y + r * (cellH + gap), w: cellW, h: cellH, fontSize: 9.5, fontFace: FONT, bold: true, color: "7C2D12", align: "center", valign: "middle", margin: 0 });
    }
  }
  // legend
  const lx = x + labelW + k * (cellW + gap) + 0.25;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: y + 0.1, w: 0.3, h: 0.22, rectRadius: 0.03, fill: { color: C.PRIMARY }, line: { color: "FFFFFF", width: 0 } });
  slide.addText("train", { x: lx + 0.36, y: y + 0.05, w: 0.9, h: 0.3, fontSize: 11, fontFace: FONT, color: C.MUTED, margin: 0 });
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: y + 0.48, w: 0.3, h: 0.22, rectRadius: 0.03, fill: { color: C.ACCENT }, line: { color: "FFFFFF", width: 0 } });
  slide.addText("validation", { x: lx + 0.36, y: y + 0.43, w: 1.2, h: 0.3, fontSize: 11, fontFace: FONT, color: C.MUTED, margin: 0 });
  return { h: k * (cellH + gap), w: labelW + k * (cellW + gap) };
}

// ---------- pipeline schematic (sklearn Pipeline) ----------
function pipelineDiagram(slide, pres, { x, y, w, stages, h = 0.85 }) {
  const n = stages.length, gap = 0.5, bw = (w - gap * (n - 1)) / n;
  stages.forEach((st, i) => {
    const bx = x + i * (bw + gap);
    const isModel = i === n - 1;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: bx, y, w: bw, h, rectRadius: 0.08,
      fill: { color: isModel ? C.PRIMARY : C.PRIMARY_TINT }, line: { color: "FFFFFF", width: 0 },
    });
    slide.addText([
      { text: st.t, options: { bold: true, fontSize: 13.5, color: isModel ? "FFFFFF" : C.PRIMARY_DARK, breakLine: !!st.d } },
      ...(st.d ? [{ text: st.d, options: { fontSize: 10.5, color: isModel ? C.PRIMARY_TINT : C.MUTED, breakLine: false } }] : []),
    ], { x: bx + 0.12, y: y + 0.08, w: bw - 0.24, h: h - 0.16, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
    if (i < n - 1) slide.addText("→", { x: bx + bw - 0.08, y: y + h / 2 - 0.22, w: gap + 0.16, h: 0.44, fontSize: 20, fontFace: FONT, color: C.PRIMARY, align: "center", margin: 0 });
  });
}

// helper: save
function save(pres, file) {
  return pres.writeFile({ fileName: file });
}

module.exports = {
  C, FONT, MONO, W, H, M, COURSE,
  deckInit, content, titleSlide, sectionSlide, footer, footerDark,
  bullets, card, codeBlock, outputBlock, flowRow, bigStat,
  takeaways, labSlide, agendaSlide, compTable, kfoldDiagram, pipelineDiagram, save,
};
