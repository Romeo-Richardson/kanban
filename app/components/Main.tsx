import Reactm from "react";

type MainProps = {
  children: React.ReactNode;
};
const Main = ({ children }: MainProps) => {
  return (
    <div className="min-h-full flex-grow flex flex-col relative">
      {children}
    </div>
  );
};

export default Main;
