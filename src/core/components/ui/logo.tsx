import Image from "next/image";

import LogoImage from "../../../../public/images/logo.png";

export const Logo = () => {
  return (
    <Image
      alt="Logo of Altha Consulting"
      className="object-contain pointer-events-none select-none"
      fill
      sizes="(min-width: 768px) 50vw, 100vw"
      src={LogoImage}
    />
  );
};
