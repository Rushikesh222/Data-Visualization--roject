import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

export const Graph = () => {
  const [lineChartValue, setLineChartValue] = useState();
  const [lineName, setLineName] = useState("");
  const orginalData = useSelector((state) => state.salesData);
  console.log(orginalData);

  const graphData = useSelector((state) => state.filterSales);

  const time = ["A", "B", "C", "D", "E", "F"];
  const filteredData = orginalData.filter((result) => {
    let existingItem = orginalData.filter((r) => r.Day === result.Day);
  });

  const groupData = graphData.reduce((acc, curr) => {
    time.forEach((time) => {
      if (!acc[time]) {
        acc[time] = 0;
      }
      acc[time] += curr[time];
    });
    return acc;
  }, {});
  const xaxis = Object.keys(groupData);
  const yaxis = Object.values(groupData);

  console.log(xaxis, yaxis);

  if (!groupData || groupData.length === 0) {
    return <div>No data available</div>;
  }
  if (!lineChartValue || lineChartValue.length === 0) {
    console.log("hello");
  }
  function handleLineChart(lineChart) {
    const lineChartData = orginalData.map((data) => ({
      day: data.Day,
      value: data[lineChart],
    }));
    const chartDataFilter = lineChartData.reduce(
      (accumulator, currentValue) => {
        const existingDay = accumulator.find(
          (item) => item.day === currentValue.day
        );

        if (existingDay) {
          existingDay.value += currentValue.value;
        } else {
          accumulator.push({
            day: currentValue.day,
            value: currentValue.value,
          });
        }

        return accumulator;
      },
      []
    );
    console.log("chartDataFilter", chartDataFilter);
    const finalResult = chartDataFilter.map((data) => data.value);
    console.log("finalresult", finalResult);
    setLineChartValue(finalResult);
  }

  const state = {
    options: {
      chart: {
        type: "bar",
        zoom: {
          enabled: true,
        },
        events: {
          click: function (event, chartContext, config) {
            const selectedCategoryValues = xaxis[config.dataPointIndex];
            handleLineChart(selectedCategoryValues);
            setLineName(selectedCategoryValues);
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: xaxis,
        tickPlacement: "on",
      },
    },

    series: [
      {
        name: "Series 1",
        data: yaxis,
      },
    ],
  };
  const mergedData = orginalData.reduce((acc, item) => {
    const formattedDay = item.Day && item.Day.replace("/2022", "");

    // Check if this day already exists in the accumulator
    if (acc[formattedDay]) {
      // Merge logic if the day already exists (e.g., summing up a 'value' property)
      acc[formattedDay].value += item.value || 0; // Adjust this as per your data structure
    } else {
      // Add a new entry if the day does not exist
      acc[formattedDay] = { ...item, Day: formattedDay };
    }

    return acc;
  }, {});

  // Convert merged data to an array and extract unique days for categories
  const uniqueCategories = Object.keys(mergedData);

  const lineState = {
    series: [
      {
        name: "Desktops",
        data: lineChartValue,
      },
    ],
    options: {
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4,
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        type: "category",
        categories: uniqueCategories,
        tickPlacement: "on",
      },
    },
    // series: [
    //   {
    //     name: "Desktops",
    //     data: lineChartValue,
    //   },
    // ],
    // options: {
    //   chart: {
    //     height: 350,
    //     type: "line",
    //     zoom: {
    //       enabled: false,
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     curve: "straight",
    //   },
    //   title: {
    //     text: "Product Trends by Month",
    //     align: "left",
    //   },
    //   grid: {
    //     row: {
    //       colors: ["#f3f3f3", "transparent"],
    //       opacity: 0.5,
    //     },
    //   },
    //   xaxis: {
    //     categories: uniqueCategories,
    //   },
    // },
  };

  console.log(lineState, uniqueCategories, lineChartValue);

  return (
    <div className="w-full">
      <div className="w-full flex text-center justify-center">
        <h1 className="text-[25px] font-bold">Data Chart</h1>
      </div>

      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        className="w-full p-2"
      />
      <Chart
        series={lineState.series}
        options={lineState.options}
        type="line"
        className="w-full p-2"
      />
    </div>
  );
};
