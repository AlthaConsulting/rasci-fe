interface RelatedObjectDTO {
  id: string;
  value: string;
}

interface City {
  id: string;
  name: string;
  province: Province;
  created_at: Date;
  updated_at: Date;
}

interface ContactRelationship {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface EducationalDegree {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface Department {
  id: string;
  name: string;
  job_positions: JobPosition[];
  created_at: Date;
  updated_at: Date;
}

interface JobPosition {
  id: string;
  name: string;
  department: Department;
  created_at: Date;
  updated_at: Date;
}

interface JobLevel {
  id: string;
  name: string;
  job_position: JobPosition;
  created_at: Date;
  updated_at: Date;
}

interface MaritalStatus {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface OfficeLocation {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface Province {
  id: string;
  name: string;
  cities: City[];
  created_at: Date;
  updated_at: Date;
}

interface Religion {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

interface YearsOfExperience {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}
