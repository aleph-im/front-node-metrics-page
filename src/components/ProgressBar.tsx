import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  isLoading: boolean;
  loadDuration: number;
  progressCap?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  isLoading,
  loadDuration,
  progressCap = 92,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0); // Reset progress on load start
      const intervalTime = 100; // Update every 100ms
      const increment = progressCap / (loadDuration / intervalTime); // Calculate increment to reach cap over specified duration

      const intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          return prevProgress + increment <= progressCap
            ? prevProgress + increment
            : progressCap;
        });
      }, intervalTime);

      return () => clearInterval(intervalId);
    }
  }, [isLoading, loadDuration]); // Dependency on isLoading to reset interval when a new load starts

  // When isLoading changes to false, complete the progress bar
  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      const timeoutId = setTimeout(() => setProgress(0), 500); // Optionally reset after a delay
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="bg-gradient-to-r to-[#00d1ff] from-[#0054ff] h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
