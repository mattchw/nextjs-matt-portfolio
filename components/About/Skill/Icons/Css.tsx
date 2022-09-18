import React from "react";

export interface Props {
  size?: number;
  color?: string;
}

const Css: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M 3 2 L 5 20 L 11.992188 22 L 19 20 L 21 2 Z M 16.726563 10.347656 L 16.34375 16.589844 L 12.027344 18 L 7.710938 16.589844 L 7.546875 13.605469 L 9.734375 13.605469 L 9.789063 14.960938 L 12.027344 15.722656 L 14.269531 14.960938 L 14.433594 12.519531 L 9.625 12.519531 L 9.515625 10.347656 L 14.539063 10.347656 L 14.703125 8.175781 L 7.164063 8.175781 L 7 6.007813 L 17 6.007813 Z"></path>
    </svg>
  );
};

export default Css;
