import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  TrashIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from "../../../app/Services/Admin/adminMatches";
import { useParams } from "react-router-dom";

export default function CreateNewQuestionPopup({
  open,
  setOpen,
  question,
  match,
}) {
  const { matchId } = useParams();

  const [addQuestion, { isLoading: isAddQuestionLoading }] =
    useAddQuestionMutation();
  const [updateQuestion, { isLoading: isUpdateQuestionLoading }] =
    useUpdateQuestionMutation();

  // State for question form
  const [questionData, setQuestionData] = useState({
    question: "",
    options: [
      { text: "", odds: "", isCorrect: false },
      { text: "", odds: "", isCorrect: false }
    ],
  });

  // Populate form with existing question data when editing
  useEffect(() => {
    if (open && question) {
      setQuestionData({
        question: question.question,
        options: question.options.map((opt) => ({
          text: opt.option,
          odds: opt.odds.toString(),
          isCorrect: opt.isCorrect,
        })),
      });
    }
  }, [open, question]);

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...questionData.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setQuestionData({ ...questionData, options: newOptions });
  };

  const addOption = () => {
    setQuestionData({
      ...questionData,
      options: [
        ...questionData.options,
        { text: "", odds: "", isCorrect: false },
      ],
    });
  };

  const deleteOption = (indexToDelete) => {
    if (questionData.options.length <= 2) {
      toast.error("Minimum 2 options are required");
      return;
    }
    const newOptions = questionData.options.filter(
      (_, index) => index !== indexToDelete
    );
    setQuestionData({
      ...questionData,
      options: newOptions,
    });
  };

  const handleCorrectOptionUpdate = (index) => {
    const newOptions = questionData.options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === index,
    }));
    setQuestionData({
      ...questionData,
      options: newOptions,
    });
  };

  const onSubmit = async () => {
    if (!questionData.question.trim()) {
      toast.error("Question is required");
      return;
    }

    if (questionData.options.length < 2) {
      toast.error("At least two options are required");
      return;
    }

    // Validate that all options have text and odds
    const invalidOptions = questionData.options.some(
      (opt) => !opt.text.trim() || !opt.odds.trim()
    );
    if (invalidOptions) {
      toast.error("All options must have text and odds");
      return;
    }

    try {
      const formattedOptions = questionData.options.map((opt, index) => ({
        id: index + 1,
        option: opt.text,
        odds: parseFloat(opt.odds) || 0,
        isCorrect: opt.isCorrect,
      }));

      const payload = {
        question: questionData.question,
        options: formattedOptions,
        matchId: matchId,
      };

      if (question) {
        // Update existing question
        await updateQuestion({ ...payload, id: question.id }).unwrap();
        toast.success("Question updated successfully");
      } else {
        // Create new question
        await addQuestion(payload).unwrap();
        toast.success("Question created successfully");
      }
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message ||
          `Failed to ${question ? "update" : "create"} question`
      );
      console.error("Error details:", error);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/50" />
      <div className="fixed inset-0 z-11 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="relative bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-md mx-2">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">
              {question ? "Edit Question" : "Create New Question - "}
              <p className="text-gray-200 text-sm font-normal">
                Match: {match?.match_title}
              </p>
            </DialogTitle>

            <div className="space-y-4">
              <input
                type="text"
                value={questionData.question}
                onChange={(e) =>
                  setQuestionData({ ...questionData, question: e.target.value })
                }
                placeholder="Enter your question"
                className="w-full bg-gray-800 rounded-md border border-gray-700 px-2 sm:px-3 py-2 text-white text-sm sm:text-base"
              />

              {questionData.options.map((option, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="w-full sm:w-1/2">
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) =>
                          handleOptionChange(index, "text", e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        className={`w-full bg-gray-800 rounded-md border ${
                          option.isCorrect
                            ? "border-indigo-500"
                            : "border-gray-700"
                        } px-2 sm:px-3 py-2 text-white text-sm sm:text-base`}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-1/2">
                      <input
                        type="number"
                        min="0"
                        value={option.odds}
                        onChange={(e) =>
                          handleOptionChange(index, "odds", e.target.value)
                        }
                        placeholder="Odds"
                        className="flex-1 sm:w-24 bg-gray-800 rounded-md border border-gray-700 px-2 sm:px-3 py-2 text-white text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => deleteOption(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={addOption}
                  className="text-indigo-400 text-sm hover:text-indigo-300"
                >
                  + Add Another Option
                </button>
              </div>

              <button
                type="button"
                onClick={onSubmit}
                className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-500 text-sm sm:text-base"
              >
                {isAddQuestionLoading || isUpdateQuestionLoading
                  ? question
                    ? "Updating..."
                    : "Creating..."
                  : question
                  ? "Update Question"
                  : "Create Question"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
