import { GlobalStyle, Styled } from "./styled.js";
import Menu from "./components/Menu.jsx";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    return (
        <Styled.Wrapper>
            {/* global reset/base */}
            <GlobalStyle />
            <ToastContainer position="bottom-right" theme="dark" />

            <Styled.Main>
                {/* Left sticky nav */}
                <Styled.LeftCol>
                    <Menu />
                </Styled.LeftCol>

                {/* Right content (header + page) */}
                <Styled.RightCol>
                    <Dashboard />
                </Styled.RightCol>
            </Styled.Main>
        </Styled.Wrapper>
    );
}
