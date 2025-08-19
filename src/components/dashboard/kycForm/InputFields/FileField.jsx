import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  color: var(--muted);
`;

const Input = styled.input`
  background: #0b1220;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const Preview = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--border);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ClearBtn = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  cursor: pointer;

  &:hover {
    border-color: var(--danger);
    background: rgba(239, 68, 68, 0.1);
  }
`;

const Error = styled.span`
  color: var(--danger);
  font-size: 12px;
  line-height: 1.2;
`;

export default function FileField({
    label,
    name,
    setValue,
    watch,
    error,
    required = false,
}) {
    const inputRef = useRef(null);

    const file = watch(name);

    const previewUrl = useMemo(() => {
        if (!file) return null;
        return URL.createObjectURL(file);
    }, [file]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const onPick = (e) => {
        const f = e.target.files?.[0];
        setValue(name, f || null, { shouldValidate: true });
    };

    const onClear = () => {
        setValue(name, null, { shouldValidate: true });
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <Field>
            <Label htmlFor={name}>
                {label} {required ? "*" : ""}
            </Label>

            <Input
                ref={inputRef}
                id={name}
                type="file"
                accept="image/png,image/jpeg"
                onChange={onPick}
            />

            <Row>
                {previewUrl && <Preview src={previewUrl} alt="Profile preview" />}
                {file && <ClearBtn onClick={onClear}>Clear</ClearBtn>}
            </Row>

            {error && <Error>{error.message}</Error>}
        </Field>
    );
}
