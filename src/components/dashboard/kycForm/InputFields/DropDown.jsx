import styled from "styled-components";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  color: var(--muted);
`;

const Select = styled.select`
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

const Error = styled.span`
  color: var(--danger);
  font-size: 12px;
  line-height: 1.2;
`;

export default function DropDown({
    label,
    name,
    register,
    options = [],
    error,
    required = false,
}) {
    return (
        <Field>
            <Label htmlFor={name}>
                {label} {required ? "*" : ""}
            </Label>

            <Select id={name} {...register(name)}>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </Select>

            {error && <Error>{error.message}</Error>}
        </Field>
    );
}
