const useStrengthChecker = (password: string) => {
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[#$^+=!*()@%&]/.test(password)) score++;
    return score;
  };

  const strengthLabels = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong",
  ];

  const strengthColors = [
    "#b91c1c",
    "#ef4444",
    "#eab308",
    "#22c55e",
    "#15803d",
  ];

  const strength = getPasswordStrength(password);

  return {
    color: strengthColors[strength - 1],
    label: strengthLabels[strength - 1],
    strength,
  };
};

export const PasswordStrengthBar = ({ password }: { password: string }) => {
  const { color, label, strength } = useStrengthChecker(password);

  if (!password.trim().length) return null;
  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-2 rounded-full bg-[#D9D9D9]">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-[width,colors] ease-out duration-200"
          style={{
            backgroundColor: color,
            width: `${(strength / 5) * 100}%`,
          }}
        />
      </div>
      <p className="text-xs" style={{ color: color }}>
        {label}
      </p>
    </div>
  );
};
