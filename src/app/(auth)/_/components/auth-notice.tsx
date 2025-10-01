export const AuthNotice = ({
  children,
  headerIcon,
  message,
  title,
}: {
  children?: React.ReactNode;
  headerIcon?: React.ReactNode;
  message?: string | React.ReactNode;
  title: string;
}) => {
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col items-center justify-center gap-4">
        {headerIcon}
        <header className="flex flex-col gap-4">
          <h1 className="text-heading-large text-center">{title}</h1>
          {message && typeof message === "string" ? (
            <p className={"text-sm text-center"}>{message}</p>
          ) : (
            message
          )}
        </header>
      </header>
      {children}
    </section>
  );
};
