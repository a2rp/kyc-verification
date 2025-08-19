import styled from "styled-components";
import { VerifyIcon, DeleteIcon } from "../icons";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  background: linear-gradient(0deg, var(--surface-2), var(--surface-2));
  border-bottom: 1px solid var(--border);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: saturate(1.2) blur(4px);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  letter-spacing: 0.3px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  cursor: pointer;
  transition: 140ms ease;

  &:hover {
    border-color: var(--primary);
    background: rgba(37, 99, 235, 0.12);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: saturate(0.6);
  }
`;

export default function Header({ onVerify, onDelete, submitting = false }) {
    return (
        <Bar>
            {/* Header title */}
            <Title>KYC Verification</Title>

            {/* Buttons talk to parent via props */}
            <Actions>
                <Button onClick={onVerify} disabled={submitting} title="Approve / Verify">
                    <VerifyIcon />
                    {submitting ? "Submitting..." : "Verify"}
                </Button>
                <Button onClick={onDelete} disabled={submitting} title="Clear form">
                    <DeleteIcon />
                    Delete
                </Button>
            </Actions>
        </Bar>
    );
}
