import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        min-width: 320px;
        background: #07111f;
    }

    body {
        margin: 0;
        min-width: 320px;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #07111f;
        color: #e7eef9;
    }

    button,
    input,
    select {
        font: inherit;
    }

    button:focus-visible,
    input:focus-visible,
    select:focus-visible {
        outline: 3px solid rgba(96, 165, 250, 0.45);
        outline-offset: 2px;
    }
`;

const Wrapper = styled.div`
    --bg: #07111f;
    --surface: #0d1a2b;
    --surface-strong: #111f32;
    --surface-soft: #15263c;
    --primary: #60a5fa;
    --primary-strong: #3b82f6;
    --text: #e7eef9;
    --muted: #91a5bf;
    --border: #29415e;
    --success: #34d399;
    --danger: #fb7185;

    min-height: 100vh;
    background:
        radial-gradient(circle at 80% 0%, rgba(37, 99, 235, 0.13), transparent 30rem),
        var(--bg);
    color: var(--text);
`;

const Main = styled.main`
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 250px minmax(0, 1fr);
`;

const LeftCol = styled.aside`
    position: sticky;
    top: 0;
    z-index: 20;
    align-self: start;
    height: 100vh;
    overflow-y: auto;
    background: rgba(9, 22, 37, 0.96);
    border-right: 1px solid var(--border);
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;

    @media (max-width: 780px) {
        position: fixed;
        inset: 0 auto 0 0;
        width: min(290px, 86vw);
        transform: ${({ $menuOpen }) =>
            $menuOpen ? "translateX(0)" : "translateX(-105%)"};
        box-shadow: 20px 0 50px rgba(0, 0, 0, 0.35);
    }
`;

const RightCol = styled.section`
    min-width: 0;
    min-height: 100vh;
    background: rgba(7, 17, 31, 0.8);
`;

const Section = styled.div`
    width: min(100%, 1180px);
    margin: 0 auto;
    padding: clamp(20px, 3vw, 42px);
`;

const Intro = styled.section`
    margin-bottom: 22px;
    padding: clamp(20px, 3vw, 30px);
    border: 1px solid var(--border);
    border-radius: 18px;
    background:
        linear-gradient(135deg, rgba(59, 130, 246, 0.12), transparent 55%),
        var(--surface);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.16);

    .eyebrow {
        margin: 0 0 8px;
        color: var(--primary);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }

    h2 {
        margin: 0 0 8px;
        font-size: clamp(24px, 3vw, 34px);
        line-height: 1.12;
    }

    p {
        max-width: 720px;
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
    }
`;

const MobileOverlay = styled.button`
    display: none;

    @media (max-width: 780px) {
        display: ${({ $open }) => ($open ? "block" : "none")};
        position: fixed;
        inset: 0;
        z-index: 15;
        border: 0;
        background: rgba(1, 7, 16, 0.64);
        cursor: pointer;
    }
`;

export const Styled = {
    Wrapper,
    Main,
    LeftCol,
    RightCol,
    Section,
    Intro,
    MobileOverlay,
};
