import { AxiosError, AxiosResponse } from "axios";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { URLs } from "./urls";
import { accountClient } from "./client";
import { systemClient } from "./client";

// User Profile
export const useUserProfile = () => {
  return useQuery<
    AxiosResponse<UserProfile>,
    AxiosError<{ errors: ApiResponseError[] }>,
    UserProfile,
    [string]
  >({
    queryKey: ["UserProfile"],
    queryFn: () => accountClient.get(`${URLs.USER_ROFILE}/`),
    select: (data) => data.data,
  });
};


// Applicant Information
export const useApplicantInformation = () => {
  return useQuery<
    AxiosResponse<ApplicantInformation>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApplicantInformation,
    [string]
  >({
    queryKey: ["ApplicantInformation"],
    queryFn: () => accountClient.get(`${URLs.APPLICANT_INFORMATION}/`),
    select: (data) => data.data,
  });
};
export const useCreateApplicantInformation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<void>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApplicantInformationDTO
  >({
    mutationKey: ["create:applicant_information"],
    mutationFn: (payload) => {
      const formData = new FormData();

      if (payload.profile_picture) formData.append("profile_picture", payload.profile_picture);
      formData.append(
        "date_of_birth",
        format(payload.date_of_birth, "yyyy-MM-dd")
      );
      formData.append("gender", payload.gender);
      formData.append("phone_number", payload.phone_number);
      formData.append("street_address", payload.street_address);
      formData.append("city", payload.city);
      formData.append("province", payload.province);
      formData.append("cv", payload.cv);
      formData.append("expected_salary", payload.expected_salary);
      formData.append("interest_status", payload.interest_status);
      formData.append("applicant_source", payload.applicant_source);

      return accountClient.post(`${URLs.APPLICANT_INFORMATION}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};
export const useUpdateApplicantInformation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<void>,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApplicantInformationDTO
  >({
    mutationKey: ["update:applicant_information"],
    mutationFn: (payload) => {
      const formData = new FormData();

      if (payload.profile_picture) formData.append("profile_picture", payload.profile_picture);
      formData.append(
        "date_of_birth",
        format(payload.date_of_birth, "yyyy-MM-dd")
      );
      formData.append("gender", payload.gender);
      formData.append("phone_number", payload.phone_number);
      formData.append("street_address", payload.street_address);
      formData.append("city", payload.city);
      formData.append("province", payload.province);
      formData.append("cv", payload.cv);
      formData.append("expected_salary", payload.expected_salary);
      formData.append("interest_status", payload.interest_status);
      formData.append("applicant_source", payload.applicant_source);

      return accountClient.put(`${URLs.APPLICANT_INFORMATION}/${payload.applicant_information_id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};


// Formal Education
export const useFormalEducation = () => {
  return useQuery<
    AxiosResponse<FormalEducation>,
    AxiosError<{ errors: ApiResponseError[] }>,
    FormalEducation,
    [string]
  >({
    queryKey: ["FormalEducation"],
    queryFn: () => accountClient.get(`${URLs.FORMAL_EDUCATION}/`),
    select: (data) => data.data,
  });
};
export const useCreateFormalEducation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<void>,
    AxiosError<{ errors: ApiResponseError[] }>,
    FormalEducationDTO[]
  >({
    mutationKey: ["update:formal_education"],
    mutationFn: (payload) => {
      const formData = new FormData();
      payload.forEach((education, index) => {
        formData.append(
          `educations[${index}][institution_name]`,
          education.institution_name
        );
        formData.append(
          `educations[${index}][field_of_study]`,
          education.field_of_study
        );
        formData.append(`educations[${index}][degree]`, education.degree);
        formData.append(`educations[${index}][gpa]`, education.gpa);
        formData.append(
          `educations[${index}][start_date]`,
          format(education.start_date, "yyyy-MM-dd")
        );
        if (education.end_date) {
          formData.append(
            `educations[${index}][end_date]`,
            format(education.end_date, "yyyy-MM-dd")
          );
        }
        formData.append(
          `educations[${index}][still_studying]`,
          String(education.still_studying)
        );
        formData.append(
          `educations[${index}][academic_transcript]`,
          education.academic_transcript
        );
        if (education.ijazah) {
          formData.append(`educations[${index}][ijazah]`, education.ijazah);
        }
      });

      return accountClient.post(`${URLs.FORMAL_EDUCATION}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};
export const useUpdateFormalEducation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<void>,
    AxiosError<{ errors: ApiResponseError[] }>,
    FormalEducationDTO[]
  >({
    mutationKey: ["update:formal_education"],
    mutationFn: (payload) => {
      const formData = new FormData();

      payload.forEach((education, index) => {
        if (education.id) {
          formData.append(`educations[${index}][id]`, education.id);
        }

        formData.append(`educations[${index}][institution_name]`, education.institution_name);
        formData.append(`educations[${index}][field_of_study]`, education.field_of_study);
        formData.append(`educations[${index}][degree]`, education.degree);
        formData.append(`educations[${index}][gpa]`, education.gpa);
        formData.append(`educations[${index}][start_date]`, format(education.start_date, "yyyy-MM-dd"));

        if (education.end_date) {
          formData.append(`educations[${index}][end_date]`, format(education.end_date, "yyyy-MM-dd"));
        }

        formData.append(`educations[${index}][still_studying]`, String(education.still_studying));

        if (education.academic_transcript instanceof File) {
          formData.append(`educations[${index}][academic_transcript]`, education.academic_transcript);
        }

        if (education.ijazah instanceof File) {
          formData.append(`educations[${index}][ijazah]`, education.ijazah);
        }
      });

      return accountClient.put(`${URLs.FORMAL_EDUCATION}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};

// Working Experience
export const useWorkingExperience = () => {
  return useQuery<
    AxiosResponse<WorkingExperience>,
    AxiosError<{ errors: ApiResponseError[] }>,
    WorkingExperience,
    [string]
  >({
    queryKey: ["WorkingExperience"],
    queryFn: () => accountClient.get(`${URLs.WORKING_EXPERIENCE}/`),
    select: (data) => data.data,
  });
};
export const useCreateWorkingExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<void>,
    AxiosError<{ errors: ApiResponseError[] }>,
    WorkingExperienceDTO[]
  >({
    mutationKey: ["update:working_experience"],
    mutationFn: (payload) => {
      const formData = new FormData();
      payload.forEach((experience, index) => {
        formData.append(
          `experiences[${index}][company_name]`,
          experience.company_name
        );
        formData.append(
          `experiences[${index}][position]`,
          experience.position
        );
        formData.append(
          `experiences[${index}][start_date]`,
          format(experience.start_date, "yyyy-MM-dd")
        );
        if (experience.end_date) {
          formData.append(
            `experiences[${index}][end_date]`,
            format(experience.end_date, "yyyy-MM-dd")
          );
        }
        formData.append(
          `experiences[${index}][still_working]`,
          String(experience.still_working)
        );
      });

      return accountClient.post(`${URLs.WORKING_EXPERIENCE}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};
export const useUpdateWorkingExperience = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<void>,
    AxiosError<{ errors: ApiResponseError[] }>,
    WorkingExperienceDTO[]
  >({
    mutationKey: ["update:working_experience"],
    mutationFn: (payload) => {
      const formData = new FormData();

      payload.forEach((experience, index) => {
        if (experience.id) formData.append(`experiences[${index}][id]`, experience.id);
        formData.append(`experiences[${index}][company_name]`, experience.company_name);
        formData.append(`experiences[${index}][position]`, experience.position);
        formData.append(`experiences[${index}][start_date]`, format(experience.start_date, "yyyy-MM-dd"));
        if (experience.end_date) formData.append(`experiences[${index}][end_date]`, format(experience.end_date, "yyyy-MM-dd"));
        formData.append(`experiences[${index}][still_working]`, String(experience.still_working));
      });

      return accountClient.put(`${URLs.WORKING_EXPERIENCE}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};

// HC System Data
export const useProvinces = (params: {
  page: string;
  page_size: string;
}) => {
  return useQuery<
    AxiosResponse<
      ApiResponse<{ records: Province[] }, PaginationResponseMeta>
    >,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: Province[] }, PaginationResponseMeta>,
    [string, { page: string; page_size: string }]
  >({
    queryKey: ["provinces", params],
    queryFn: () => {
      return systemClient.get(URLs.PROVINCES, {
        params,
      });
    },
    select: (data) => data.data,
  });
};
export const useCities = (params: {
  page: string;
  page_size: string;
}) => {
  return useQuery<
    AxiosResponse<
      ApiResponse<{ records: City[] }, PaginationResponseMeta>
    >,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: City[] }, PaginationResponseMeta>,
    [string, { page: string; page_size: string }]
  >({
    queryKey: ["cities", params],
    queryFn: () => {
      return systemClient.get(URLs.CITIES, {
        params,
      });
    },
    select: (data) => data.data,
  });
};
export const useEducationalDegree = (params: {
  page: string;
  page_size: string;
}) => {
  return useQuery<
    AxiosResponse<
      ApiResponse<{ records: EducationalDegree[] }, PaginationResponseMeta>
    >,
    AxiosError<{ errors: ApiResponseError[] }>,
    ApiResponse<{ records: EducationalDegree[] }, PaginationResponseMeta>,
    [string, { page: string; page_size: string }]
  >({
    queryKey: ["cities", params],
    queryFn: () => {
      return systemClient.get(URLs.EDUCATIONAL_DEGREES, {
        params,
      });
    },
    select: (data) => data.data,
  });
};
