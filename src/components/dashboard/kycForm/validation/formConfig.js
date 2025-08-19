export const genderOptions = [
    { label: "Select gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

export const maritalStatusOptions = [
    { label: "Select a status", value: "" },
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
];

export const occupationOptions = [
    { label: "Select Occupation", value: "" },
    { label: "Student", value: "student" },
    { label: "Business", value: "business" },
    { label: "Tourism", value: "tourism" },
    { label: "Agriculture", value: "agriculture" },
    { label: "Trade", value: "trade" },
    { label: "Tech", value: "tech" },
    { label: "Medical", value: "medical" },
    { label: "Education", value: "education" },
    { label: "Self Employed", value: "self_employed" },
];

export const stateOptions = [
    { label: "Select State", value: "" },
    { label: "Bagmati", value: "bagmati" },
    { label: "Gandaki", value: "gandaki" },
    { label: "Koshi", value: "koshi" },
    { label: "Lumbini", value: "lumbini" },
    { label: "Madhesh", value: "madhesh" },
    { label: "Karnali", value: "karnali" },
    { label: "Sudurpashchim", value: "sudurpashchim" },
];

export const documentTypeOptions = [
    { label: "Select a document type", value: "" },
    { label: "Citizenship", value: "citizenship" },
    { label: "License", value: "license" },
    { label: "Passport", value: "passport" },
];

export const defaultValues = {
    // Personal
    fullName: "",
    gender: "",
    dateOfBirth: "",
    fatherName: "",
    grandfatherName: "",
    maritalStatus: "",
    occupationField: "",
    emailAddress: "",
    contactNumber: "",

    // Address
    state: "",
    district: "",
    municipality: "",
    wardNo: "",
    toleName: "",

    // Document
    documentType: "",
    documentNo: "",
    issuedDistrict: "",
    dateOfIssue: "",

    // File
    profilePicture: null,
};

export const labels = {
    // Personal
    fullName: "Full Name",
    gender: "Gender",
    dateOfBirth: "DOB",
    fatherName: "Father Name",
    grandfatherName: "Grand Father Name (optional)",
    maritalStatus: "Marital Status (optional)",
    occupationField: "Occupation Field",
    emailAddress: "Email Address",
    contactNumber: "Contact Number",

    // Address
    state: "State",
    district: "District",
    municipality: "Municipality",
    wardNo: "Ward No",
    toleName: "Tole Name (optional)",

    // Document
    documentType: "Document Type",
    documentNo: "Document No",
    issuedDistrict: "Issued District",
    dateOfIssue: "Date of Issue",

    // File
    profilePicture: "Profile Photo",
};
