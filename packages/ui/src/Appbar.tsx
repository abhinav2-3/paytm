import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b border-slate-300 px-10 py-2">
      <div className="text-lg flex flex-col justify-center font-semibold">
        PayTM
      </div>
      <div className="flex justify-center gap-6 pt-2">
        {user?.name && (
          <div className="font-bold text-xl pt-1 flex gap-2">
            Welcome{" "}
            <h1 className="text-blue-600">
              {user?.name?.split(" ").slice(0, 1).join(" ")}
            </h1>
          </div>
        )}
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
