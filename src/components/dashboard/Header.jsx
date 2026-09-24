import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { VerifyIcon, DeleteIcon } from "../icons";

const Bar = styled.header`
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    min-height: 78px;
    padding: 14px clamp(18px, 3vw, 38px);
    border-bottom: 1px solid var(--border);
    background: rgba(7, 17, 31, 0.94);
    backdrop-filter: blur(14px);
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;

    img {
        width: 42px;
        height: 42px;
        object-fit: contain;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--surface);
    }

    small {
        display: block;
        margin-bottom: 3px;
        color: var(--primary);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.14em;
        text-transform: uppercase;
    }
`;

const Title = styled.h1`
    margin: 0;
    font-size: clamp(18px, 2vw, 24px);
    line-height: 1.1;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
`;

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
    padding: 9px 13px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    color: var(--text);
    cursor: pointer;

    &:hover {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    @media (max-width: 560px) {
        span {
            display: none;
        }

        width: 40px;
        justify-content: center;
        padding: 9px;
    }
`;

const MenuButton = styled(Button)`
    display: none;

    @media (max-width: 780px) {
        display: inline-flex;
    }
`;

export default function Header({
    onVerify,
    onDelete,
    onMenuToggle,
    submitting = false,
}) {
    return (
        <Bar>
            <Brand>
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="KYC verification logo" />
                <div>
                    <small>Secure workspace</small>
                    <Title>KYC Verification</Title>
                </div>
            </Brand>

            <Actions>
                <MenuButton
                    type="button"
                    onClick={onMenuToggle}
                    aria-label="Open navigation menu"
                    title="Open navigation menu"
                >
                    <FiMenu aria-hidden="true" />
                </MenuButton>
                <Button
                    type="button"
                    onClick={onVerify}
                    disabled={submitting}
                    title="Verify form"
                >
                    <VerifyIcon />
                    <span>{submitting ? "Submitting..." : "Verify"}</span>
                </Button>
                <Button
                    type="button"
                    onClick={onDelete}
                    disabled={submitting}
                    title="Clear form"
                >
                    <DeleteIcon />
                    <span>Delete</span>
                </Button>
            </Actions>
        </Bar>
    );
}
