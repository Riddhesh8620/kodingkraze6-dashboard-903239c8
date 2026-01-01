import { useEffect, useState, useCallback } from "react";

interface TabDetectionResult {
  tabSwitchCount: number;
  isTabActive: boolean;
  resetCount: () => void;
}

export const useTabDetection = (onTabSwitch?: (count: number) => void): TabDetectionResult => {
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);

  const resetCount = useCallback(() => {
    setTabSwitchCount(0);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        setTabSwitchCount((prev) => {
          const newCount = prev + 1;
          onTabSwitch?.(newCount);
          return newCount;
        });
      } else {
        setIsTabActive(true);
      }
    };

    const handleBlur = () => {
      setIsTabActive(false);
      setTabSwitchCount((prev) => {
        const newCount = prev + 1;
        onTabSwitch?.(newCount);
        return newCount;
      });
    };

    const handleFocus = () => {
      setIsTabActive(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [onTabSwitch]);

  return { tabSwitchCount, isTabActive, resetCount };
};
