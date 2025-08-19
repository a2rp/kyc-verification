import {
    forwardRef,
    useImperativeHandle,
    useState,
    useRef,
    useEffect,
    useMemo,
} from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { TextField, DropDown, FileField } from "./InputFields";
import { formSchema } from "./validation";
import {
    defaultValues,
    labels,
    genderOptions,
    maritalStatusOptions,
    occupationOptions,
    stateOptions,
    documentTypeOptions,
} from "./validation";

const Card = styled.div`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
  & + & { margin-top: 16px; }
`;

const SectionTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 22px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before{
    content: "";
    width: 6px;
    height: 22px;
    background: #ef4444;
    border-radius: 3px;
    display: inline-block;
  }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 820px) { grid-template-columns: 1fr; }
`;
const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 16px;
  @media (max-width: 1024px){ grid-template-columns: repeat(2, minmax(0,1fr)); }
  @media (max-width: 820px){ grid-template-columns: 1fr; }
`;
const Row = styled.div` display:flex; gap:16px; `;
const Buttons = styled.div` display:flex; gap:10px; margin-top:14px; `;
const Button = styled.button`
  display:inline-flex; align-items:center; gap:8px;
  padding:10px 14px; border-radius:10px; border:1px solid var(--border);
  background:rgba(255,255,255,0.03); color:var(--text); cursor:pointer;
  transition:140ms ease;
  &:hover{ border-color:var(--primary); background:rgba(37,99,235,.12); }
  &:disabled{ opacity:.6; cursor:not-allowed; filter:saturate(.6); }
`;
const DangerBtn = styled(Button)`
  &:hover{ border-color:var(--danger); background:rgba(239,68,68,.1); }
`;
const Output = styled.pre`
  margin:0; padding:14px; background:#0b1220; border:1px solid var(--border);
  border-radius:12px; color:var(--text); white-space:pre-wrap; word-break:break-word;
`;

const DRAFT_KEY = "kyc_form_draft_v2";

const safeLoadDraft = () => {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); }
    catch { return null; }
};
const saveDraft = (values) => {
    const { profilePicture, ...rest } = values;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(rest));
};
const clearDraft = () => localStorage.removeItem(DRAFT_KEY);

const KycForm = forwardRef(function KycForm(
    { onSubmittingChange, apiMode = "success" },
    ref
) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues,
        resolver: yupResolver(formSchema),
        mode: "onBlur",
    });

    useEffect(() => { onSubmittingChange?.(isSubmitting); }, [isSubmitting, onSubmittingChange]);

    useEffect(() => {
        const draft = safeLoadDraft();
        if (draft) {
            reset({ ...defaultValues, ...draft, profilePicture: null });
            toast.info("Draft restored from device");
        }
    }, [reset]);

    const debounceRef = useRef(null);
    useEffect(() => {
        const sub = watch((vals) => {
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => saveDraft(vals), 400);
        });
        return () => { sub.unsubscribe(); clearTimeout(debounceRef.current); };
    }, [watch]);

    const docType = watch("documentType");
    const docNumberLabel = useMemo(() => {
        switch (docType) {
            case "citizenship": return "Citizenship No";
            case "license": return "License No";
            case "passport": return "Passport No";
            default: return labels.documentNo;
        }
    }, [docType]);

    const fakeApi = (formData) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (apiMode === "success") return resolve({ ok: true });
                if (apiMode === "error") return reject(new Error("Server error"));
                Math.random() < 0.85 ? resolve({ ok: true }) : reject(new Error("Server error"));
            }, 600);
        });

    const [submitted, setSubmitted] = useState(null);

    const toFormData = (values) => {
        const fd = new FormData();
        Object.entries(values).forEach(([k, v]) => {
            if (k === "profilePicture") {
                if (v) fd.append("profilePicture", v, v.name);
            } else fd.append(k, v ?? "");
        });
        return fd;
    };

    const onSubmit = async (values) => {
        try {
            const fd = toFormData(values);
            await fakeApi(fd);
            toast.success("KYC submitted successfully 🎉");
            clearDraft();

            const file = values.profilePicture
                ? { name: values.profilePicture.name, size: values.profilePicture.size, type: values.profilePicture.type }
                : null;
            setSubmitted({ ...values, profilePicture: file });
        } catch (e) {
            toast.error(e?.message || "Submission failed");
        }
    };

    const onReset = () => {
        reset(defaultValues);
        setSubmitted(null);
        clearDraft();
        toast.info("Form cleared");
    };

    useImperativeHandle(ref, () => ({
        submitForm: () => handleSubmit(onSubmit)(),
        resetForm: onReset,
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* === Personal Details === */}
            <Card>
                <SectionTitle>Personal Details</SectionTitle>
                <Grid3>
                    <TextField
                        label={labels.fullName}
                        name="fullName"
                        register={register}
                        placeholder="Ashish Ranjan"
                        error={errors.fullName}
                        required
                    />
                    <DropDown
                        label={labels.gender}
                        name="gender"
                        register={register}
                        options={genderOptions}
                        error={errors.gender}
                        required
                    />
                    <TextField
                        label={labels.dateOfBirth}
                        name="dateOfBirth"
                        register={register}
                        type="date"
                        error={errors.dateOfBirth}
                        required
                    />

                    <TextField
                        label={labels.fatherName}
                        name="fatherName"
                        register={register}
                        placeholder="Enter your father's name"
                        error={errors.fatherName}
                        required
                    />
                    <TextField
                        label={labels.grandfatherName}
                        name="grandfatherName"
                        register={register}
                        placeholder="Enter your grand father's name"
                        error={errors.grandfatherName}
                    />
                    <DropDown
                        label={labels.maritalStatus}
                        name="maritalStatus"
                        register={register}
                        options={maritalStatusOptions}
                        error={errors.maritalStatus}
                    />

                    <DropDown
                        label={labels.occupationField}
                        name="occupationField"
                        register={register}
                        options={occupationOptions}
                        error={errors.occupationField}
                        required
                    />
                    <TextField
                        label={labels.emailAddress}
                        name="emailAddress"
                        register={register}
                        type="email"
                        placeholder="name@example.com"
                        error={errors.emailAddress}
                        required
                    />
                    <TextField
                        label={labels.contactNumber}
                        name="contactNumber"
                        register={register}
                        type="tel"
                        placeholder="0812345678"
                        error={errors.contactNumber}
                        required
                    />
                </Grid3>
            </Card>

            {/* === Address Details === */}
            <Card>
                <SectionTitle>Address Details</SectionTitle>
                <Grid3>
                    <DropDown
                        label={labels.state}
                        name="state"
                        register={register}
                        options={stateOptions}
                        error={errors.state}
                        required
                    />
                    <TextField
                        label={labels.district}
                        name="district"
                        register={register}
                        placeholder="e.g., Kathmandu"
                        error={errors.district}
                        required
                    />
                    <TextField
                        label={labels.municipality}
                        name="municipality"
                        register={register}
                        placeholder="e.g., Budhanilkantha"
                        error={errors.municipality}
                        required
                    />
                    <TextField
                        label={labels.wardNo}
                        name="wardNo"
                        register={register}
                        placeholder="1"
                        error={errors.wardNo}
                        required
                    />
                    <TextField
                        label={labels.toleName}
                        name="toleName"
                        register={register}
                        placeholder="(optional)"
                        error={errors.toleName}
                    />
                </Grid3>
            </Card>

            {/* === Document Details === */}
            <Card>
                <SectionTitle>Document Details</SectionTitle>
                <Grid3>
                    <DropDown
                        label={labels.documentType}
                        name="documentType"
                        register={register}
                        options={documentTypeOptions}
                        error={errors.documentType}
                        required
                    />
                    <TextField
                        label={docNumberLabel}
                        name="documentNo"
                        register={register}
                        placeholder="Enter document number"
                        error={errors.documentNo}
                        required
                    />
                    <TextField
                        label={labels.issuedDistrict}
                        name="issuedDistrict"
                        register={register}
                        placeholder="e.g., Lalitpur"
                        error={errors.issuedDistrict}
                        required
                    />
                    <TextField
                        label={labels.dateOfIssue}
                        name="dateOfIssue"
                        register={register}
                        type="date"
                        error={errors.dateOfIssue}
                        required
                    />
                </Grid3>
            </Card>

            {/* === Profile Photo === */}
            <Card>
                <SectionTitle>Profile Photo</SectionTitle>
                <Row>
                    <FileField
                        label={labels.profilePicture}
                        name="profilePicture"
                        setValue={setValue}
                        watch={watch}
                        error={errors.profilePicture}
                        required
                    />
                </Row>

                <Buttons>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <DangerBtn type="button" onClick={onReset} disabled={isSubmitting}>
                        Reset
                    </DangerBtn>
                </Buttons>
            </Card>

            {/* Debug output */}
            {submitted && (
                <Card>
                    <SectionTitle>Submitted Payload (debug)</SectionTitle>
                    <Output>{JSON.stringify(submitted, null, 2)}</Output>
                </Card>
            )}

            {/* developer */}
            <div style={{ margin: "15px 10px" }}>
                Designed and developed by <a href="https://www.ashishranjan.net" target="_blank" style={{ color: "#fff" }}>https://www.ashishranjan.net</a>
            </div>
        </form>
    );
});

export default KycForm;
