import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiArrowUp } from "react-icons/fi";
import { Styled } from "../../styled.js";
import Header from "./Header.jsx";
import KycForm from "./kycForm";
import Footer from "../Footer.jsx";

const TopButton = styled.button`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 12;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: var(--surface-strong);
    color: var(--text);
    cursor: pointer;

    &:hover {
        border-color: var(--primary);
        box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.12);
    }
`;

export default function Dashboard({ onMenuToggle }) {
    const kycRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 360);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleVerify = () => kycRef.current?.submitForm();
    const handleDelete = () => kycRef.current?.resetForm();

    return (
        <>
            <Header
                onVerify={handleVerify}
                onDelete={handleDelete}
                onMenuToggle={onMenuToggle}
                submitting={submitting}
            />

            <Styled.Section>
                <Styled.Intro>
                    <p className="eyebrow">Applicant review</p>
                    <h2>Complete a careful KYC verification</h2>
                    <p>
                        Capture personal, address, document, and profile information in one
                        validated workflow. Drafts are saved locally while you work.
                    </p>
                </Styled.Intro>
                <KycForm ref={kycRef} onSubmittingChange={setSubmitting} />
            </Styled.Section>

            <Footer />

            {showTop && (
                <TopButton
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Go to top"
                    title="Go to top"
                >
                    <FiArrowUp aria-hidden="true" />
                </TopButton>
            )}
        </>
    );
}