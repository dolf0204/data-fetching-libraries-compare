import { FC, ReactNode } from "react";
import "./Button.css";

interface IProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const FetchButton: FC<IProps> = ({ onClick, children, className }) => {
  return (
    <div className={`${className} button-container`}>
      <button onClick={onClick} className="common-button">
        {children}
      </button>
    </div>
  );
};

export default FetchButton;
