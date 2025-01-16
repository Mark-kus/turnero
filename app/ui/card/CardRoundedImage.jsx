import Image from "next/image";

import defaultProfile from "@public/default/profile.svg";

const CardRoundedImage = ({ href }) => {
  const srcImage = href ? href : defaultProfile;
  return (
    <figure>
      <Image src={srcImage} alt="Profile image" width={100} height={100} className="mb-auto mt-2" />
      <div className="divider divider-horizontal m-1"></div>
    </figure>
  );
};

export default CardRoundedImage;
