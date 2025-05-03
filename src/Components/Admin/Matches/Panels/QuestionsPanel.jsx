import React, { useState } from "react";
import { Disclosure, DisclosureButton } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { useUpdateCorrectAnswerMutation, useUpdateQuestionMutation } from "../../../../app/Services/Admin/adminMatches";



export default function QuestionsPanel({ match, questions, setOpen, setQuestion, editingQuestionId, setEditingQuestionId }) {
   const {matchId} = useParams();
    const [updateCorrectAnswer, { isLoading: isUpdating }] = useUpdateCorrectAnswerMutation();
    const [updateQuestion, { isLoading: isUpdateQuestionLoading }] =
    useUpdateQuestionMutation();
    const [isSettingVoid, setIsSettingVoid] = useState({});
    const handleSetVoidOption = async (e, questionId) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSettingVoid(prev => ({ ...prev, [questionId]: true }));
        try {
            // Find the current question
            const currentQuestion = questions.questions.find(q => q.id === questionId);
            if (!currentQuestion) {
                throw new Error('Question not found');
            }
            // Create a new void option
            const newVoidOption = {
                id: currentQuestion.options.length + 1,
                option: 'void',
                odds: 1,
                isCorrect: false,
            };
            // Combine existing options with the new void option
            const formattedOptions = [
                ...currentQuestion.options,
                newVoidOption
            ];
            // Update the question with the new options array
            await updateQuestion({
                id: questionId,
                question: currentQuestion.question,
                options: formattedOptions,
                matchId: matchId,
            }).unwrap();
            // Set the void option as correct answer
            await updateCorrectAnswer({
                questionId: questionId,
                correctOption: newVoidOption.id
            }).unwrap();
            toast.success('Void option added and set as correct answer!');
        } catch (error) {
            console.error('Failed to add void option:', error);
            toast.error('Failed to add void option');
        } finally {
            setIsSettingVoid(prev => ({ ...prev, [questionId]: false }));
        }
    };
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
                                                                            + Edit Option
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
                                                                        {!faq.options.some(opt => opt.option === 'void') && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(e) => handleSetVoidOption(e, faq.id)}
                                                                                disabled={isSettingVoid[faq.id]}
                                                                                className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-1"
                                                                            >
                                                                                Set Void Option
                                                                                {isSettingVoid[faq.id] && (
                                                                                    <svg className="animate-spin h-4 w-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                    </svg>
                                                                                )}
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