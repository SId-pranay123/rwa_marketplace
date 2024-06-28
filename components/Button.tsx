import { ReactNode } from "react";

interface Props {
  text: string;
  onClick: () => void;
  children?: ReactNode;
}

const Button = ({ onClick, text, children }: Props) => (
      <button
      className="bg-accent-lighter border-2 text-black cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
      >
      {text ? (
            <p className="font-bold text-white truncate text-center">{text}</p>
          ) : (
            children
          )}
      </button>
      );
export default Button;
