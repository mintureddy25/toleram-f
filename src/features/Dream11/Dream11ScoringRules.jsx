import React from "react";
import BackButton from "../../Components/BackButton";
export default function Dream11ScoringRules() {
  const rulesData = {
    captainRoles: [
      { id: 1, role: "Captain", multiplier: "2×", icon: "C", bgColor: "bg-indigo-600" },
      { id: 2, role: "Vice-Captain", multiplier: "1.5×", icon: "VC", bgColor: "bg-indigo-600" }
    ],
    categories: [
      {
        id: 1,
        name: "Batting Points",
        points: [
          { id: 1, action: "Run Scored", value: "+1" },
          { id: 2, action: "Boundary (4)", value: "+4" },
          { id: 3, action: "Six (6)", value: "+6" }
        ]
      },
      {
        id: 2,
        name: "Bowling Points",
        points: [
          { id: 1, action: "Wicket (excluding Run Out)", value: "+25" },
          { id: 2, action: "Maiden Over", value: "+12" }
        ]
      },
      {
        id: 3,
        name: "Fielding Points",
        points: [
          { id: 1, action: "Stumping", value: "+12" },
          { id: 2, action: "Catch", value: "+8" },
          { id: 3, action: "Run Out", value: "+12" }
        ]
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-md overflow-hidden text-sm">
      <BackButton/>
      <div className="bg-indigo-600 px-4 py-3 m-2 rounded-md">
        <h1 className="text-lg font-bold text-white">Dream11 Scoring Rules</h1>
      </div>
      
      <div className="p-3 space-y-4">
        <div className="space-y-2">
          <h2 className="text-md font-bold text-gray-100 pb-1">Captain & Vice-Captain</h2>
          <div className="grid grid-cols-2 gap-2">
            {rulesData.captainRoles.map(role => (
              <div key={role.id} className="bg-gray-800 p-2 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${role.bgColor} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-sm font-bold">{role.icon}</span>
                  </div>
                  <div className="ml-2">
                    <h3 className="font-bold text-sm">{role.role}</h3>
                    <p className="text-gray-200 text-xs mt-1">{role.multiplier} Points</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {rulesData.categories.map(category => (
          <div key={category.id} className="space-y-2">
            <h2 className="text-md font-bold text-gray-100">{category.name}</h2>
            <div className="overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Action</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-100 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-300">
                  {category.points.map(point => (
                    <tr key={point.id}>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-left font-medium text-gray-200">{point.action}</td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-200 text-right">{point.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}