import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";
import { Disclosure, DisclosureButton, Tab } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import CreateNewQuestionPopup from "./CreateNewQuestionPopup";
import CreateNewMatch from "./AddNewmatchPopup";
import { useGetAdminQuestionsQuery, useGetMatchQuery, useUpdateCorrectAnswerMutation } from "../../../app/Services/Admin/adminMatches";
import { toast } from "react-hot-toast";
import ScoreDashboard from "./MatchScore/ScoreDashboard";
import QuestionsList from "./Panels/QuestionsList";
import QuestionsPanel from "./Panels/QuestionsPanel";


export default function AdminMatches() {
    const { matchId } = useParams();
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [question, setQuestion] = useState(null);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const {
        data: match,
        isLoading: matchLoading,
        isError: matchError,
    } = useGetMatchQuery(matchId);
    const { data: questions, isLoading, isError } = useGetAdminQuestionsQuery(matchId);
    const [updateCorrectAnswer, { isLoading: isUpdating }] = useUpdateCorrectAnswerMutation();

    const handleAnswerSelect = async (questionId, option) => {
        try {
            await updateCorrectAnswer({
                questionId,
                correctOption: option
            }).unwrap();
            toast.success('Correct answer updated successfully!');
        } catch (error) {
            console.error('Failed to update correct answer:', error);
            toast.error('Failed to update correct answer');
        }
    };

    if (isLoading || isUpdating) return <Loader />

    return (
        <div className="py-8">
            <Tab.Group defaultIndex={0}>
                <Tab.List className="flex space-x-4 px-4 sm:px-8 mb-6">
                    <Tab className={({ selected }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium focus:outline-none ${selected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`
                    }>
                        Questions
                    </Tab>
                    <Tab className={({ selected }) =>
                        `px-4 py-2 rounded-lg text-sm font-medium focus:outline-none ${selected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`
                    }>
                        Player Score
                    </Tab>
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <QuestionsPanel
                            match={match}
                            questions={questions}
                            setOpen={setOpen}
                            setQuestion={setQuestion}
                            editingQuestionId={editingQuestionId}
                            setEditingQuestionId={setEditingQuestionId}
                            updateCorrectAnswer={updateCorrectAnswer}
                        />
                    </Tab.Panel>

                    <Tab.Panel className="score">
                        <ScoreDashboard matchId={matchId} match={match?.match} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {open && <CreateNewQuestionPopup open={open} setOpen={setOpen} question={question} match={match?.match} />}
            {openEdit && <CreateNewMatch open={openEdit} setOpen={setOpenEdit} matchId={matchId} />}
        </div>
    )
}