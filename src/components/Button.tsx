import { FC, ReactNode } from "react";
import "./Button.css";

interface IProps {
  children?: ReactNode;
  onClick?: () => void;
}

const FetchButton: FC<IProps> = ({ onClick, children }) => {
  return (
    <div className="button-container">
      <button onClick={onClick} className="common-button">
        {children}
      </button>
    </div>
  );
};

export default FetchButton;
