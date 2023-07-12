import { ReactNode } from "react";

interface cardprop {
  children: ReactNode;
  className?: string;
  header?: string;
}

const Card: React.FC<cardprop> = ({ children, className, header }) => {
  return (
    <div className="my-4">
      <h1 className="p-2 text-base font-semibold">{header}</h1>
      <div
        className={`rounded-2xl border border-gray-400 py-3 px-5 ${className} `}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
