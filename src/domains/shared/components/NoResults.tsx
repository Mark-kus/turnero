import Image from "next/image";
import NoResultsImage from "@public/no-results.svg";

const NoResults = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="hero h-full">
      <div className="hero-content text-center">
        <div className="flex max-w-md flex-col items-center justify-center">
          <Image
            alt="No Results"
            className="h-auto w-auto"
            height={300}
            src={NoResultsImage}
            width={300}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default NoResults;
