import Image from "next/image";

import NoResultsImage from "@public/no-results.svg";

const NoResults = ({ children }) => {
  return (
    <div className="hero h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Image
            src={NoResultsImage}
            alt="No Results"
            width={500}
            height={500}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default NoResults;
