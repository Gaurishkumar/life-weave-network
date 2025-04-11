
import React, { Suspense } from "react";
import Spline from "@splinetool/react-spline";

interface SplineAnimationProps {
  splineUrl: string;
  className?: string;
}

const SplineAnimation: React.FC<SplineAnimationProps> = ({
  splineUrl,
  className = "",
}) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D scene...</div>}>
        <Spline scene={splineUrl} />
      </Suspense>
    </div>
  );
};

export default SplineAnimation;
