// User Profile
interface UserProfile {
  id: string;
  email: string;
  full_name: string;
}

// Applicant Information
interface ApplicantInformation {
  id: string;
  applicant_information_id: string;
  profile_picture: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  street_address: string;
  city: string;
  province: string;
  cv: string;
  expected_salary: string;
  interest_status: string;
  applicant_source: string;
  created_at: string;
  updated_at: string;
}
interface ApplicantInformationDTO {
  id: string;
  applicant_information_id: string;
  profile_picture: File;
  date_of_birth: Date;
  gender: string;
  phone_number: string;
  street_address: string;
  city: string;
  province: string;
  cv: File;
  expected_salary: string;
  interest_status: string;
  applicant_source: string;
}

// Formal Education
interface FormalEducation {
  institution_name: string | null;
  field_of_study: string | null;
  degree: string | null;
  gpa: string | null;
  start_date: string | null;
  end_date: string | null;
  still_studying: boolean;
  academic_transcript: string | null;
  ijazah: string | null;
  educations: Array;
}
interface FormalEducationDTO {
  id?: string | null;
  institution_name: string;
  field_of_study: string;
  degree: string;
  gpa: string;
  start_date: Date;
  end_date: Date | null;
  still_studying: boolean;
  academic_transcript: File;
  ijazah: File | null;
}

// Working Experience
interface WorkingExperience {
  company_name: string | null;
  position: string | null;
  start_date: string | null;
  end_date: string | null;
  still_working: boolean;
  experiences: Array;
}
interface WorkingExperienceDTO {
  id?: string | null;
  company_name: string;
  position: string;
  start_date: Date;
  end_date: Date | null;
  still_working: boolean;
}