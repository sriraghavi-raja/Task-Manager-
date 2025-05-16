import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Column from './Column';
import TaskModal from './TaskModal';

const initialData = {
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: [] },
    inprogress: { id: 'inprogress', title: 'In Progress', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] }
  },
  tasks: {}
};

export default function Board() {
  const [data, setData] = useState(initialData);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const boardRef = doc(db, 'boards', 'kanban');
      const docSnap = await getDoc(boardRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        await setDoc(boardRef, initialData);
      }
    };
    fetchData();
  }, []);

  const updateBoard = async (newData) => {
    setData(newData);
    await updateDoc(doc(db, 'boards', 'kanban'), newData);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn }
      };
      updateBoard(newData);
      return;
    }

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = [...finish.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    updateBoard(newData);
  };

  const handleAddTask = (columnId, task) => {
    const taskId = Date.now().toString();
    const newTask = { ...task, id: taskId };
    
    const newTasks = { ...data.tasks, [taskId]: newTask };
    const newColumn = {
      ...data.columns[columnId],
      taskIds: [...data.columns[columnId].taskIds, taskId]
    };
    
    const newData = {
      ...data,
      tasks: newTasks,
      columns: { ...data.columns, [columnId]: newColumn }
    };
    
    updateBoard(newData);
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];
    
    const newColumns = { ...data.columns };
    Object.keys(newColumns).forEach(columnId => {
      newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);
    });
    
    const newData = { ...data, tasks: newTasks, columns: newColumns };
    updateBoard(newData);
  };

  const handleEditTask = (updatedTask) => {
    const newTasks = { ...data.tasks, [updatedTask.id]: updatedTask };
    const newData = { ...data, tasks: newTasks };
    updateBoard(newData);
    setIsModalOpen(false);
  };

  return (
    <div className="board-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.values(data.columns).map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={column.taskIds.map(taskId => data.tasks[taskId]).filter(Boolean)}
              onTaskAdd={handleAddTask}
              onTaskDelete={handleDeleteTask}
              onTaskEdit={(task) => {
                setSelectedTask(task);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleEditTask}
        />
      )}
    </div>
  );
}