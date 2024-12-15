import { ring } from "ldrs";

const LoadingSpinner = () => {
  // @ts-ignore
  ring.register();

  return (
    <div className="flex w-full h-full justify-center items-center">
      <l-ring
        size="40"
        stroke="5"
        bg-opacity="0"
        speed="2"
        color="black"
      ></l-ring>
    </div>
  );
};

export default LoadingSpinner;
