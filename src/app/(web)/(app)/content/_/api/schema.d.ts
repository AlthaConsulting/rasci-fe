interface Job {
  id: number;
  department: string;
  job_position: string;
  employment_type: string;
  job_level: string;
  job_placement: string;
  job_description: string;
}

type VacancyStatus = "Draft" | "Active" | "On Hold" | "Closed" | "Archived";

interface Vacancy {
  id: string;
  status: VacancyStatus;
  department_name: string;
  description: string;
  employee_type: string;
  position_name: string;
  name: string;
  location_name: string;
  requirements: string;
  responsibilities: string;
  years_of_experience: string;
  created_at: Date;
  updated_at: Date;
  records: Array;
}
