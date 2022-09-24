import React, { } from 'react'
import Image from 'next/image'
import { useAppDispatch } from 'app/hooks'
import { editSubtasks } from '../../../features/board/boardSlice'
import SubTaskItem from './SubTaskItem';
import { Task } from '@src/types';
import { CircleWavyCheck } from 'phosphor-react'
import StatustDropdown from '@components/shared/StatustDropdown';

interface props {
    data: Task;
    completedTaskCount: number
    i: number
    j: number
    boardNameTag: string
}

const TaskDetailsModal = ({ data, j, completedTaskCount, i, boardNameTag }: props) => {
    const dispatch = useAppDispatch()
    const subtasks = [...data.subtasks]


    const onChangeSubtaskStatus = (title: string) => {
        const newSubtasks = subtasks.map(subtask => {
            return subtask.title !== title ? subtask
                : { ...subtask, isCompleted: !subtask.isCompleted }
        })
        console.log(newSubtasks)
        const newTask = { ...data, subtasks: newSubtasks }
        dispatch(editSubtasks({ task: newTask, index: j, boardName: boardNameTag, columnName: data.status }))
    }


    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-6">
                <h1 className="text-[18px] font-bold">{data.title}</h1>
                <Image src="/assets/icon-vertical-ellipsis.svg" alt="vertical ellipsis" height={16} width={4} />
            </div>
            <p className="text-[13px] text-mediumGrey">
                {data.description ? data.description : 'no description'}
            </p>
            <h3 className="flex items-center mt-6 mb-4 text-[13px] font-bold text-mediumGrey dark:text-white">
                Subtasks ({completedTaskCount} of {data.subtasks.length})&nbsp;
                 {completedTaskCount === data.subtasks.length && <CircleWavyCheck size={28} color="#635FC7" weight="thin" /> }
            </h3>

            <form>
                {
                    subtasks.map((subtask: any, i: number) => {
                        return <SubTaskItem subtask={subtask} i={i} key={subtask.title} onChangeSubtaskStatus={() => onChangeSubtaskStatus(subtask.title)} />

                    })
                }
            </form>
            {/* <StatustDropdown boardColumns={data} currentStatus={data.status} /> */}
        </>
    )
}

export default TaskDetailsModal;