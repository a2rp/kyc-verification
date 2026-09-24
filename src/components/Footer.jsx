import { createElement } from "react";
import styled from "styled-components";
import {
    FiCodepen,
    FiCoffee,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLifeBuoy,
    FiLinkedin,
    FiMail,
    FiYoutube,
} from "react-icons/fi";

const FooterWrap = styled.footer`
    width: min(100%, 1180px);
    margin: 0 auto;
    padding: 28px clamp(20px, 3vw, 42px) 34px;
`;

const FooterInner = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 22px;
    padding-top: 22px;
    border-top: 1px solid var(--border);

    @media (max-width: 760px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const Copy = styled.p`
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.7;

    a {
        color: var(--text);
        font-weight: 700;
        text-decoration: none;

        &:hover {
            color: var(--primary);
            text-shadow: 0 0 16px rgba(96, 165, 250, 0.45);
        }
    }
`;

const Groups = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;

    @media (max-width: 760px) {
        justify-content: flex-start;
    }
`;

const IconLink = styled.a`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--muted);
    text-decoration: none;

    &:hover {
        border-color: var(--primary);
        color: var(--text);
        box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.12);
    }
`;

const links = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FiCodepen },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FiLinkedin },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FiFacebook },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FiYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FiLifeBuoy },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FiCoffee },
    { label: "Patreon", href: "https://patreon.com/a2rp", icon: FiHeart },
];

export default function Footer() {
    return (
        <FooterWrap>
            <FooterInner>
                <Copy>
                    Copyright © {new Date().getFullYear()}{" "}
                    <a
                        href="https://www.ashishranjan.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ashish Ranjan
                    </a>
                </Copy>

                <Groups aria-label="External links">
                    {links.map(({ label, href, icon }) => (
                        <IconLink
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                            aria-label={label}
                            title={label}
                        >
                            {createElement(icon, { "aria-hidden": true })}
                        </IconLink>
                    ))}
                </Groups>
            </FooterInner>
        </FooterWrap>
    );
}