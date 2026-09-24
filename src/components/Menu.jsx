import { createElement } from "react";
import styled from "styled-components";
import {
    FiBarChart2,
    FiFileText,
    FiList,
    FiSettings,
    FiUsers,
    FiX,
} from "react-icons/fi";

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 92px;
    padding: 20px;
    border-bottom: 1px solid var(--border);

    img {
        width: 42px;
        height: 42px;
        object-fit: contain;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: #07111f;
    }

    strong {
        display: block;
        font-size: 16px;
        letter-spacing: 0.02em;
    }

    span {
        display: block;
        margin-top: 3px;
        color: var(--muted);
        font-size: 11px;
    }
`;

const CloseButton = styled.button`
    display: none;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: 1px solid var(--border);
    border-radius: 9px;
    background: transparent;
    color: var(--text);
    cursor: pointer;

    &:hover {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
    }

    @media (max-width: 780px) {
        display: inline-flex;
    }
`;

const Nav = styled.nav`
    display: grid;
    gap: 8px;
    padding: 22px 14px;
`;

const Item = styled.button`
    display: flex;
    align-items: center;
    gap: 11px;
    width: 100%;
    padding: 12px 13px;
    border: 1px solid transparent;
    border-radius: 11px;
    background: transparent;
    color: var(--muted);
    text-align: left;
    cursor: pointer;

    svg {
        flex: 0 0 auto;
        color: var(--primary);
    }

    &:hover,
    &.active {
        border-color: var(--border);
        background: var(--surface-soft);
        color: var(--text);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
    }

    &.active {
        border-color: rgba(96, 165, 250, 0.56);
    }
`;

const Note = styled.p`
    margin: auto 20px 24px;
    padding: 14px;
    border-left: 2px solid var(--primary);
    color: var(--muted);
    font-size: 12px;
    line-height: 1.6;
`;

const items = [
    { label: "Dashboard", icon: FiBarChart2 },
    { label: "KYC Forms", icon: FiFileText },
    { label: "Users", icon: FiUsers },
    { label: "Verification logs", icon: FiList },
    { label: "Security settings", icon: FiSettings },
];

export default function Menu({ onClose }) {
    return (
        <>
            <Brand>
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="KYC verification logo" />
                <div>
                    <strong>KYC Admin</strong>
                    <span>Verification workspace</span>
                </div>
                <CloseButton type="button" onClick={onClose} aria-label="Close menu">
                    <FiX />
                </CloseButton>
            </Brand>

            <Nav aria-label="Primary navigation">
                {items.map(({ label, icon }, index) => (
                    <Item
                        key={label}
                        type="button"
                        className={index === 0 ? "active" : ""}
                        onClick={onClose}
                        aria-current={index === 0 ? "page" : undefined}
                    >
                        {createElement(icon, { "aria-hidden": true })}
                        <span>{label}</span>
                    </Item>
                ))}
            </Nav>

            <Note>
                Review applicant details carefully before submitting a verification decision.
            </Note>
        </>
    );
}
