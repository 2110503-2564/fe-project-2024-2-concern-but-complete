"use client";
import React, { ReactElement } from "react";

// Define the NavigateBtnProps to accept an icon component that also accepts className
interface NavigateBtnProps {
  icon: ReactElement<React.SVGProps<SVGSVGElement>>; // Define icon type as React component
  label: string;
  onClick?: () => void;
}

function NavigateBtn({ icon, label, onClick }: NavigateBtnProps) {
    const isDashboard = label === "Dashboard";
    const isLogOut = label === "Log Out";
    return (
        <button
            onClick={onClick}
            className={`w-64 h-16 bg-white hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 flex items-center justify-start pl-7  ${isDashboard ? 'rounded-t-2xl' : ''} ${isLogOut ? 'rounded-b-2xl' : ''}`}
        >
            {/* Directly rendering the icon and applying the className */}
            {React.cloneElement(icon, { className: "w-5 mr-4" })}
            <span className="text-xl font-semibold">{label}</span>
        </button>
    );
}

export default NavigateBtn;
