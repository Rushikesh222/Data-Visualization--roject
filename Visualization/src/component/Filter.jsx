import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Filter = () => {
  const sales = useSelector((state) => state.salesData);
  const dispatch = useDispatch();

  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const [endFrom, setEndFrom] = useState("");
  const fromStartDate = startFrom.split("-").join("/");

  const endStartDate = endFrom.split("-").join("/");

  const filterData = {
    Gender: gender,
    Age: age,
    StartFrom: fromStartDate.split("/").reverse().join("/"),
    EndFrom: endStartDate.split("/").reverse().join("/"),
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filterSalesByGender = sales.filter(
      ({ Gender }) => Gender === filterData.Gender
    );
    const filterSalesByAge = filterSalesByGender.filter(
      ({ Age }) => Age === filterData.Age
    );
    const filterSalesByDate = filterSalesByAge.filter(
      ({ Day }) => Day >= filterData.StartFrom && Day <= filterData.EndFrom
    );

    dispatch({ type: "FILTER_SALES", payload: filterSalesByDate });
  };

  return (
    <div className="w-full py-6 px-3">
      <form className="w-full" onSubmit={handleFilter}>
        <div className="flex flex-col mb-4 items-start justify-start w-full">
          <label className=" ml-2 block mb-1 text-sm font-medium text-gray-900 text-[18px]">
            Gender
          </label>
          <div className=" w-full p-1">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col mb-4 items-start justify-start">
          <label className="block ml-2 mb-1 text-sm font-medium text-gray-900 text-[18px]">
            Select Age
          </label>
          <div className="w-full   p-1">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="Age"
              onChange={(e) => setAge(e.target.value)}
            >
              <option value="">Select Age</option>
              <option value=">25">{">25"}</option>
              <option value="15-25">15-25</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between  ">
          <div className="w-[180px]  p-1">
            <label className="block ml-2 mb-1  text-sm font-medium text-gray-900 text-[18px]">
              Start From
            </label>
            <div className="p-1">
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setStartFrom(e.target.value)}
              />
            </div>
          </div>
          <div className="w-[50px  ]     p-1">
            <label className="block ml-2 mb-1  text-sm font-medium text-gray-900 text-[18px]">
              End From
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setEndFrom(e.target.value)}
            />
          </div>
        </div>
        <button
          className="w-full bg-black mt-4 py-2 text-white text-lg rounded-xl bg-custom-gradient hover:bg-custom-gradient-hover transition duration-300 ease-in-out"
          type="submit"
        >
          Apply Filter
        </button>
      </form>
    </div>
  );
};
