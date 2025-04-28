import React, { useState } from 'react';

const TabSwitcher = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');

  return (
    <>
      <div className="flex w-full max-w-md mx-auto border border-gray-700 rounded-md overflow-hidden mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`flex-1 py-2 text-sm font-medium transition-colors duration-200 ${
              idx !== tabs.length - 1 ? 'border-r border-gray-700' : ''
            } ${
              activeTab === tab.label
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {tabs.map((tab) =>
          tab.label === activeTab ? (
            <div key={tab.label}>{tab.content}</div>
          ) : null
        )}
      </div>
    </>
  )
};

export default TabSwitcher;
