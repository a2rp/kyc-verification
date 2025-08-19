// STEP 1B: Centralized styled-components for project-level layout
// - We follow your preferred pattern: export const Styled = { Wrapper: styled.div`` };
// - We also define CSS variables on the Wrapper (project theme).
// - Only layout & global-ish primitives live here. Component-specific
//   details can live next to the component, but we can move them here if you prefer.

import styled, { createGlobalStyle } from "styled-components";

// (Optional) A very light reset + base font
export const GlobalStyle = createGlobalStyle`
  /* STEP 1B.1: Tiny reset for consistent look */
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
`;

// The main app wrapper that hosts theme variables.
// NOTE: We're setting variables on the wrapper (your preference), not :root.
const Wrapper = styled.div`
    /* STEP 1B.2: Project theme as CSS variables */
    --bg: #0b0f1a;
    --surface: #0f172a;
    --surface-2: #111827;
    --primary: #2563eb;
    --secondary: #1e40af;
    --text: #e5e7eb;
    --muted: #94a3b8;
    --border: #1f2937;
    --success: #16a34a;
    --danger: #ef4444;

    min-height: 100%;
    background: var(--bg);
    color: var(--text);
    display: flex;
    justify-content: center;
`;

// A centered container to keep content at a readable max-width
const Main = styled.main`
    width: 100%;
    max-width: 1440px;
    display: grid;
    /* STEP 1B.3: Two-column layout: left menu (fixed width) + right content */
    grid-template-columns: 280px 1fr;
    gap: 0px;
`;

// Left column: vertical nav. We'll make it sticky so it stays put while scrolling.
const LeftCol = styled.aside`
    position: sticky;
    top: 0;
    align-self: start;
    height: 100dvh; /* modern viewport unit (respects mobile UI) */
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
`;

// Right column: main dashboard area (header + content)
const RightCol = styled.section`
    min-height: 100dvh;
    background: var(--surface-2);
    display: flex;
    flex-direction: column;
`;

// An inner padder for page sections
const Section = styled.div`
    padding: 24px 28px;
`;

// We export this object per your pattern
export const Styled = {
    Wrapper,
    Main,
    LeftCol,
    RightCol,
    Section,
};
