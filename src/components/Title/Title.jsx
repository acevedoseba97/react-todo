import ReactLogo from "/react.svg";

export const Title = () => {
  return (
    <>
      <h1 className="text-5xl mb-3 text-center font-anton font-bold tracking-widest">
        Todo App
      </h1>
      <div className="flex justify-center items-center">
        <img className="w-32 h-32" src={ReactLogo} alt="React Logo" />
      </div>
    </>
  );
};
