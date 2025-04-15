import React from "react";
import QuestionsList from "./QuestionsList";

export default function QuestionsPanel({ match, questions, setOpen, setQuestion, editingQuestionId, setEditingQuestionId, updateCorrectAnswer }) {
    return (
        <div className="questions">
            <div className="px-4 sm:px-8">
                <p className="text-gray-200 text-2xl font-medium mb-6">{match?.match.match_title}</p>
                <div className="bg-gray-800 rounded-2xl inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
                    <div className="flex items-center gap-x-4">
                        <p className="max-w-4xl text-gray-100 text-xl font-semibold">
                            Questions
                        </p>
                    </div>
                    <div className="flex flex-none items-center gap-x-5">
                        <button
                            type="button"
                            onClick={() => { setOpen(true); setQuestion("") }}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-white text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                        >
                            Create question
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto lg:max-w-none">
                    <div className="mt-4 sm:mt-6">
                        <div className="">
                            <div className="bg-gray-800 rounded-2xl">
                                <div className="mx-auto max-w-7xl px-6 py-6 sm:py-12 lg:px-8 lg:py-8">
                                    <div className="mx-auto max-w-4xl">
                                        <QuestionsList
                                            questions={questions}
                                            setOpen={setOpen}
                                            setQuestion={setQuestion}
                                            editingQuestionId={editingQuestionId}
                                            setEditingQuestionId={setEditingQuestionId}
                                            updateCorrectAnswer={updateCorrectAnswer}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};