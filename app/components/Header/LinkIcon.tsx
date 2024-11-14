"use client";

import Link from "next/link";

type TargetValues = "_self" | "_blank" | "_parent" | "_top";

type LinkIconProps = {
  url: string;
  icon: string;
  target?: TargetValues;
  isChatIcon?: boolean;
  alert?: boolean;
  onClick?: () => void;
};

const LinkIcon = ({
  url,
  icon,
  target,
  isChatIcon = false,
  alert = false,
  onClick,
}: LinkIconProps) => {
  return (
    <Link
      className={`nav-link ${isChatIcon ? "alert-container" : ""} ${alert ? "alert" : ""}`}
      href={url}
      target={target}
      onClick={onClick}
    >
      <i className={icon}></i>
    </Link>
  );
};

export default LinkIcon;
