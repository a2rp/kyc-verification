import { useRef, useState } from "react";
import { Styled } from "../../styled.js";
import Header from "./Header.jsx";
import KycForm from "./kycForm";

export default function Dashboard() {
    const kycRef = useRef(null);

    const [submitting, setSubmitting] = useState(false);

    const handleVerify = () => kycRef.current?.submitForm();
    const handleDelete = () => kycRef.current?.resetForm();

    return (
        <>
            <Header
                onVerify={handleVerify}
                onDelete={handleDelete}
                submitting={submitting}
            />

            <Styled.Section>
                {/* Pass a setter so the form can tell us when it's submitting */}
                <KycForm ref={kycRef} onSubmittingChange={setSubmitting} />
            </Styled.Section>
        </>
    );
}
