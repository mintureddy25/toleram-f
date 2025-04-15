import React from "react";
import { Disclosure, DisclosureButton } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';

export default function QuestionsList({ questions, setOpen, setQuestion, editingQuestionId, setEditingQuestionId, updateCorrectAnswer }) {
    return (
        <dl className="divide-y divide-gray-900/10">
            {!questions || questions?.questions.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center">
                    <svg
                        className="mx-auto h-24 w-24 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                        />
                    </svg>
                    <h3 className="mt-4 text-xl font-semibold text-gray-100">No questions yet</h3>
                    <p className="mt-2 text-gray-400">Get started by creating your first question.</p>
                    <button
                        type="button"
                        onClick={() => { setOpen(true); setQuestion("") }}
                        className="mt-6 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Question
                    </button>
                </div>
            ) : (
                questions?.questions.map((faq) => (
                    <Disclosure key={faq.question} as="div" className="py-6 first:pt-0 last:pb-0" defaultOpen={false}>
                        {({ open }) => (
                            <>
                                <dt>
                                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-100">
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-base/7 font-semibold">{faq.question}</span>
                                            {faq.correct_option && (
                                                <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                                                    Answer Set
                                                </span>
                                            )}
                                        </div>
                                        <span className="ml-6 flex h-7 items-center">
                                            {!open ? (
                                                <PlusSmallIcon aria-hidden="true" className="size-6" />
                                            ) : (
                                                <MinusSmallIcon aria-hidden="true" className="size-6" />
                                            )}
                                        </span>
                                    </DisclosureButton>
                                </dt>
                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                    <div className="space-y-4">
                                        {faq.options.map((option) => (
                                            <div key={option.id} className="flex items-center gap-x-4">
                                                <button
                                                    onClick={async (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (editingQuestionId === faq.id) {
                                                            try {
                                                                await updateCorrectAnswer({
                                                                    questionId: faq.id,
                                                                    correctOption: option.id
                                                                }).unwrap();
                                                                toast.success('Correct answer updated successfully!');
                                                                setEditingQuestionId(null);
                                                            } catch (error) {
                                                                console.error('Failed to update correct answer:', error);
                                                                toast.error('Failed to update correct answer');
                                                            }
                                                        }
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    type="button"
                                                    className={`flex items-center gap-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 
                                                        ${+faq.correct_option === option.id ? 'bg-gray-700 border-2 border-green-500' : 'bg-gray-700'} 
                                                        text-gray-100 hover:bg-gray-600`}
                                                >
                                                    {editingQuestionId === faq.id && (
                                                        <button
                                                            type="button"
                                                            onClick={async (e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                try {
                                                                    await updateCorrectAnswer({
                                                                        questionId: faq.id,
                                                                        correctOption: option.id
                                                                    }).unwrap();
                                                                    toast.success('Correct answer updated successfully!');
                                                                    setEditingQuestionId(null);
                                                                } catch (error) {
                                                                    console.error('Failed to update correct answer:', error);
                                                                    toast.error('Failed to update correct answer');
                                                                }
                                                            }}
                                                            className="flex items-center justify-center w-5 h-5 border border-gray-400 rounded-full hover:bg-gray-600"
                                                        >
                                                            {editingQuestionId === faq.id && (
                                                                <div
                                                                    className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-400"
                                                                >
                                                                    {+faq.correct_option === option.id && (
                                                                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </button>
                                                    )}
                                                    {option.option} (Odds: {option.odds})
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-x-4 mt-4">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpen(true);
                                                setQuestion(faq);
                                            }}
                                            className="text-indigo-400 text-sm hover:text-indigo-300"
                                        >
                                            + Add Another Option
                                        </button>
                                        {editingQuestionId === faq.id ? (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setEditingQuestionId(null);
                                                }}
                                                className="text-red-400 text-sm hover:text-red-300"
                                            >
                                                Cancel Selection
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setEditingQuestionId(faq.id);
                                                }}
                                                className="text-indigo-400 text-sm hover:text-indigo-300"
                                            >
                                                Set Correct Option
                                            </button>
                                        )}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))
            )}
        </dl>
    );
};