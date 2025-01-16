import Image from "next/image";

import defaultProfile from "@public/default/profile.svg";

const CardSquaredImage = ({ href }) => {
  const srcImage = href ? href : defaultProfile;
  return (
    <div className="flex items-center justify-center w-60 border-2 rounded-lg border-base-300">
      <figure>
        <Image src={srcImage} alt="Profile image" width={20} height={20} />
      </figure>
    </div>
  );
};

export default CardSquaredImage;
