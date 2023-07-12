import React, { useState } from "react";
import "assets/styles/component.scss";
import { TabProps } from "./types";

const Tab: React.FC<TabProps> = ({
  tabs,
  buttonsStyles,
  componentClass,
  styles,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`${buttonsStyles} w-full justify-center overflow-auto lg:overflow-auto flex border-b border-grey mr-5 `}
      >
        {tabs?.map((tab, index) => (
          <div key={index}>
            <button
              className={` ${styles} ${
                activeTab === index ? "active-tab-button" : "tab-button"
              }`}
              onClick={() => {
                setActiveTab(index);
              }}
            >
              {tab?.title}
            </button>
          </div>
        ))}
      </div>
      <div className={`${componentClass} w-full h-max `}>
        {tabs && tabs[activeTab] && tabs[activeTab]?.component}
      </div>
    </div>
  );
};

export default Tab;
