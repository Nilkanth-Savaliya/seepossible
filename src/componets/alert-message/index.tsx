"use client";
import { XCircleIcon } from "@heroicons/react/20/solid";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({
  type,
  message,
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, duration);

      const interval = setInterval(() => {
        setProgress((prev) => Math.max(0, prev - 100 / (duration / 100)));
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const typeClasses = {
    success: "bg-lime-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={twMerge(
        "fixed right-5 top-5 z-[100] w-80 rounded-lg p-4 text-white shadow-lg",
        typeClasses[type]
      )}
    >
      <div className="flex items-center gap-2">
        {type === "success" && <CheckIcon className="h-6 w-6" />}
        {type === "error" && <XCircleIcon className="h-6 w-6" />}
        {type === "warning" && <ExclamationTriangleIcon className="h-4 w-4" />}
        {type === "info" && <InformationCircleIcon className="h-4 w-4" />}

        <span>{message}</span>
      </div>
      <div
        className="mt-2 h-1 bg-white"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default Alert;
