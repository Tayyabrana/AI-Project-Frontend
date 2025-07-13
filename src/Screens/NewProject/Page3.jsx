import React, { useState, useRef } from "react";

const Page3 = ({ setPage }) => {
  const expectations = [
    {
      question: "Code Quality Expectations",
      tags: ["Clean Code", "Well Documented", "Modular Architecture", "Test Coverage"],
    },
    {
      question: "Design Requirements",
      tags: ["Responsive Design", "User Friendly UI", "Modern Aesthetics", "Accessibility"],
    },
    {
      question: "Delivery Expectations",
      tags: ["Fast Delivery", "Regular Updates", "Milestone Based", "Agile Methodology"],
    },
    {
      question: "Technical Requirements",
      tags: ["Cross Platform", "Performance Optimized", "Scalable", "Secure"],
    },
    {
      question: "Deployment Needs",
      tags: ["CI/CD Setup", "Deployment Ready", "Cloud Compatible", "Containerized"],
    }
  ];

  const [selected, setSelected] = useState({});
  const containerRef = useRef(null);
  const questionRefs = useRef([]);

  const toggleFeature = (tag, questionIndex) => {
    setSelected(prev => {
      const newSelected = { ...prev };
      newSelected[questionIndex] = newSelected[questionIndex] === tag ? null : tag;
      return newSelected;
    });

    // Auto-scroll to next question if one is selected
    setTimeout(() => {
      if (questionIndex < expectations.length - 1) {
        questionRefs.current[questionIndex + 1]?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 300);
  };

  // Check if all questions have at least one tag selected
  const allQuestionsValid = expectations.every((_, index) => selected[index]);

  return (
      <div className="relative bg-white/5 p-6 shadow-lg w-full md:w-[80%] lg:w-[60%] xl:w-[50%] h-[70vh] rounded-3xl flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-blue-400 text-2xl md:text-3xl font-medium">
              What's Expected?
            </h1>
            <h6 className="text-gray-300 mt-2">
              Select one expectation from each category
            </h6>
          </div>
          <div className="text-2xl md:text-3xl font-light text-gray-500">3/7</div>
        </div>

        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto mt-6 pr-2 scrollbar-hide"
        >
          {expectations.map((item, questionIndex) => (
              <div
                  key={questionIndex}
                  ref={el => questionRefs.current[questionIndex] = el}
                  className="mb-8 last:mb-0"
              >
                <h2 className="text-white text-lg md:text-xl mb-3 py-2">
                  {item.question}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                      <button
                          key={tagIndex}
                          type="button"
                          onClick={() => toggleFeature(tag, questionIndex)}
                          className={`px-3 py-1 rounded-full text-sm md:text-base transition-all duration-200 ${
                              selected[questionIndex] === tag
                                  ? "bg-gradient-to-tr from-blue-600 to-blue-400 text-white"
                                  : "bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                      >
                        {tag}
                      </button>
                  ))}
                </div>
              </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 mt-auto border-t border-white/10">
          <button
              onClick={() => setPage(2)}
              className="bg-gradient-to-tr from-blue-600 to-blue-300 px-6 py-1.5 md:px-8 md:py-2 rounded-full text-white hover:bg-gradient-to-br text-sm md:text-base"
          >
            Back
          </button>
          <button
              onClick={() => setPage(4)}
              disabled={!allQuestionsValid}
              className={`px-6 py-1.5 md:px-8 md:py-2 rounded-full text-sm md:text-base ${
                  allQuestionsValid
                      ? "bg-gradient-to-tr from-blue-600 to-blue-300 text-white hover:bg-gradient-to-br"
                      : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default Page3;
