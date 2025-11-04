import { cn } from "@altha/core/lib/utils";

interface AuthHeaderProps {
  title: React.ReactNode;
  message:
    | React.ReactNode
    | {
        textCenter: boolean;
        content: React.ReactNode;
      };
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ message, title }) => {
  const renderMessage = () => {
    return message && typeof message === "object" && "content" in message ? (
      <div className={cn(message.textCenter && "text-center")}>
        {message.content}
      </div>
    ) : (
      <div className="text-center">
        <p className="text-sm text-center">{message}</p>
      </div>
    );
  };

  return (
    <header className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-center">{title}</h1>
      {renderMessage()}
    </header>
  );
};
