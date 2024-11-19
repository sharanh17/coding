import React, { useState } from "react";
import data from "../../data/data.js";

export const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleIds, setMultipleIds] = useState([]);

  function handleSelection(getid) {
    setSelected(getid === selected ? null : getid);
  }

  function multiSelection(getid) {
    let cpyMultiple = [...multipleIds];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getid);
    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getid);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultipleIds(cpyMultiple);
  }

  return (
    <div className="wrapper p-6">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection{" "}
      </button>
      <div className="accordion space-y-4">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-gray-300 rounded-md shadow-md"
            >
              {/* Question Section */}
              <div
                className="flex items-center justify-between p-4 hover:bg-gray-200 transition duration-300 cursor-pointer"
                onClick={
                  enableMultiSelection
                    ? () => multiSelection(item.id)
                    : () => handleSelection(item.id)
                }
              >
                <h3 className="text-lg font-medium text-gray-800">
                  {item.question}
                </h3>
                <span
                  className={`text-xl font-bold transition-transform duration-300 ${
                    selected === item.id
                      ? "rotate-45 text-gray-800"
                      : "text-gray-600"
                  }`}
                >
                  +
                </span>
              </div>
              {enableMultiSelection
                ? multipleIds.indexOf(item.id) !== -1 && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )
                : selected === item.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};
