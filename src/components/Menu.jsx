import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`;

const Brand = styled.div`
  padding: 22px 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 18px;
  border-bottom: 1px solid var(--border);
`;

const Item = styled.button`
  text-align: left;
  background: transparent;
  color: var(--text);
  border: 1px solid transparent;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--border);
  }
  &.active {
    background: rgba(37, 99, 235, 0.12);
    border-color: var(--primary);
  }
`;

export default function Menu() {
    return (
        <>
            {/* STEP 1F.1: Top brand */}
            <Brand>KYC Admin</Brand>

            {/* STEP 1F.2: Navigation items */}
            <Nav>
                <Item className="active">Dashboard</Item>
                <Item>KYC Forms</Item>
                <Item>Users</Item>
                <Item>Settings</Item>
                <Item>Logs</Item>
            </Nav>
        </>
    );
}
