import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyle, Styled } from "./styled.js";
import Menu from "./components/Menu.jsx";
import Dashboard from "./components/dashboard";

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Styled.Wrapper>
            <GlobalStyle />
            <ToastContainer position="bottom-right" theme="dark" />

            <Styled.Main>
                <Styled.LeftCol $menuOpen={menuOpen}>
                    <Menu onClose={() => setMenuOpen(false)} />
                </Styled.LeftCol>

                <Styled.MobileOverlay
                    type="button"
                    $open={menuOpen}
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                />

                <Styled.RightCol>
                    <Dashboard onMenuToggle={() => setMenuOpen((open) => !open)} />
                </Styled.RightCol>
            </Styled.Main>
        </Styled.Wrapper>
    );
}