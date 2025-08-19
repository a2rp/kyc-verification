import * as yup from "yup";

const phone10 = /^[0-9]{10}$/;
const digitsOnly = /^\d+$/;

export const formSchema = yup.object({
    // Personal
    fullName: yup
        .string()
        .trim()
        .required("Full name is required")
        .min(2, "Too short"),
    gender: yup.string().required("Gender must be selected"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    fatherName: yup.string().trim().required("Father name is required"),
    grandfatherName: yup.string().trim().nullable(), // optional
    maritalStatus: yup.string().nullable(), // optional
    occupationField: yup.string().required("Occupation is required"),
    emailAddress: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
    contactNumber: yup
        .string()
        .required("Contact number is required")
        .matches(phone10, "Enter a 10-digit number"),

    // Address
    state: yup.string().required("State is required"),
    district: yup.string().trim().required("District is required"),
    municipality: yup.string().trim().required("Municipality is required"),
    wardNo: yup
        .string()
        .trim()
        .required("Ward no is required")
        .matches(digitsOnly, "Digits only"),
    toleName: yup.string().trim().nullable(), // optional

    // Document
    documentType: yup.string().required("Document type is required"),
    documentNo: yup.string().trim().required("Document number is required"),
    issuedDistrict: yup.string().trim().required("Issued district is required"),
    dateOfIssue: yup.string().required("Date of issue is required"),

    // File
    profilePicture: yup
        .mixed()
        .test("fileRequired", "Profile photo is required", (v) => !!v)
        .test(
            "fileSize",
            "Max size 2MB",
            (v) => !v || v.size <= 2 * 1024 * 1024
        )
        .test(
            "fileType",
            "Only JPG/PNG allowed",
            (v) => !v || ["image/jpeg", "image/png"].includes(v.type)
        ),
});
