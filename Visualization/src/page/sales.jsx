import { useDispatch } from "react-redux";
import { Filter } from "../component/Filter";
import { Graph } from "../component/Graph";

export const Sales = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-full">
      <div className="w-full h-10 mt-10 flex p-2 items-center justify-end">
        <button
          onClick={() => dispatch({ type: "SIGNOUT" })}
          className="w-[120px] text-center font-bold bg-black mt-4 py-2 text-white text-lg rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out "
        >
          logout
        </button>
      </div>

      <div className="w-full h-10 mt-10 flex p-2 items-center justify-center">
        <h1 className=" font-bold text-[24px]">Check Sales</h1>
      </div>

      <div className="w-full">
        <Filter />
      </div>
      <Graph />
    </div>
  );
};
