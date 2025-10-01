export async function appliedVacancy(id:  string | null) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_CAREER_URL}/recruitment/applicant-jobs/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await res.json();

  if (!data.success) {
    return {
      success: false,
      result: {},
    };
  }

  return {
    success: true,
    result: data.result,
  };
}
