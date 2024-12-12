import React, { useEffect, useState } from "react";
import TaskTypesChart from "./TaskTypesChart";
import PriorityChart from "./PriorityChart";
import SatisfactionChart from "./SatisfactionChart";
import TimeInsightsChart from "./TimeInsightsChart";

const Data: React.FC = () => {
  const [aggregateData, setAggregateData] = useState({
    problems: 0,
    questions: 0,
    tasks: 0,
    high: 0,
    normal: 0,
    low: 0,
  });
  const [satisfactionData, setSatisfactionData] = useState({
    good: 0,
    bad: 0,
  });
  const [timeData, setTimeData] = useState({
    dates: [] as string[],
    times: [] as number[],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aggregateResponse = await fetch("/api/aggregate");
        if (!aggregateResponse.ok) {
          throw new Error("Failed to fetch aggregate data");
        }
        const aggregateData = await aggregateResponse.json();
        setAggregateData({
          problems: aggregateData.problems_percentage,
          questions: aggregateData.questions_percentage,
          tasks: aggregateData.tasks_percentage,
          high: aggregateData.high_priority_percentage,
          normal: aggregateData.normal_priority_percentage,
          low: aggregateData.low_priority_percentage,
        });
      } catch (err) {
        handleError(err, "Failed to load aggregate data.");
      }

      try {
        const satisfactionResponse = await fetch("/api/satisfaction");
        if (!satisfactionResponse.ok) {
          throw new Error("Failed to fetch satisfaction data");
        }
        const satisfactionData = await satisfactionResponse.json();
        setSatisfactionData({
          good: satisfactionData.good || 0,
          bad: satisfactionData.bad || 0,
        });
      } catch (err) {
        handleError(err, "Failed to load satisfaction data.");
      }

      try {
        const timeResponse = await fetch("/api/time-insights");
        if (!timeResponse.ok) {
          throw new Error("Failed to fetch time-based data");
        }
        const timeData = await timeResponse.json();
        setTimeData({
          dates: timeData.dates,
          times: timeData.times,
        });
      } catch (err) {
        handleError(err, "Failed to load time-based data.");
      }
    };

    fetchData();
  }, []);

  const handleError = (err: unknown, message: string) => {
    if (err instanceof Error) {
      console.error(message, err.message);
      setError(message);
    } else {
      console.error(message);
      setError(message);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Insights</h1>
      <TaskTypesChart
        problems={aggregateData.problems}
        questions={aggregateData.questions}
        tasks={aggregateData.tasks}
      />
      <PriorityChart
        high={aggregateData.high}
        normal={aggregateData.normal}
        low={aggregateData.low}
      />
      <SatisfactionChart
        good={satisfactionData.good}
        bad={satisfactionData.bad}
      />
      <TimeInsightsChart dates={timeData.dates} times={timeData.times} />
    </div>
  );
};

export default Data;
