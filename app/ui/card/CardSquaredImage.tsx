import Image from "next/image";

import defaultProfile from "@public/default/profile.svg";

const CardSquaredImage = ({ href }) => {
  const srcImage = href ? href : defaultProfile;
  return (
    <div className="flex h-full w-40 items-center justify-center rounded-lg border-2 border-base-300">
      <figure>
        <Image src={srcImage} alt="Profile image" width={20} height={20} />
      </figure>
    </div>
  );
};

export default CardSquaredImage;
