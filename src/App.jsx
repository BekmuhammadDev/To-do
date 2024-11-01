import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { tableTitles } from "@mocks/index";
import { formatDate } from "./utils";
import MainLayout from "@layouts/main-layout"
import Section from "@layouts/section";
import Container from "@layouts/container";
import Form from "@form/form"
import Input from "@form/input"
import Modal from "@components/modals"
import Button from "@ui/button"
import {Table,Tbody,Thead,Td,Trow,Th} from "./components/table/table";

const App = () => {

  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');


  const addTask = () => {
    const newTask = {
      title: title,
      created_at: Date.now(),
      isDone: false,
      id: Date.now()
    }
    if (newTask.title.trim().length) {
      setTodo([...todo, newTask]);
      setTitle('');
      toast.success("Successfully added new task!",{autoClose:3000})

    } else {
      toast.warning('Task title cannot be empty',{autoClose:3000});
    }

  }

  const deleteTask = (id) => {
    const currentTodo = todo.filter((item) => item.id != id)
    setTodo(currentTodo)
    toast.info("Successfully deleted task!",{autoClose:2000})

  }
  const editTask = (id, val) => {
    setCurrentTitle(val)
    setShowModal(true);

    localStorage.setItem('todoId', id)
  }
  const saveEdited = () => {

    let id = localStorage.getItem('todoId')

    todo.forEach((item) => {
      if (item.id == id) {
        item.title = currentTitle;
        setShowModal(false);
        toast.success("Task updated successfully!",{autoClose:2000})
      }
    })

  }

  return (
    <MainLayout>

      <ToastContainer/>

      <Section id="main">

        <Modal
          saveEdited={saveEdited}
          show={showModal}
          setShow={setShowModal}
          title={currentTitle}
          setTitle={setCurrentTitle} />

        <Container>

          <div className="todo-card my-8 mx-auto bg-slate-500 w-[600px] p-3">

            <Form
              submitFunc={addTask}
              className="p-3 border flex justify-between gap-x-2">

              <Input
                val={title}
                setVal={setTitle}
                type="text"
                placeholder="Enter Task title"
                className="grow p-2" />

              <Button
                title='Add Task'
                type="submit"
                className="bg-indigo-600 px-3 text-white rounded-sm focus:ring-2 hover:bg-indigo-400"
              />
            </Form>


            <Table className="bg-slate-400 w-full text-center">

              <Thead className="bg-white text-indigo-700 ">
                <Trow>
               {
                tableTitles.map((item)=><Th key={item.id}>{item.title}</Th>)
               }
                </Trow>
              </Thead>

              <Tbody>
                {todo.map((item, index) => {

                  return (
                    <Trow className="tr h-[50px] " key={item.id}>
                      <Td>{index + 1}</Td>
                      <Td>{item.title}</Td>
                      <Td>{formatDate(item.created_at)}</Td>
                      <Td>
                        <Button 
                        fun={() => editTask(item.id, item.title)} 
                        className="bg-blue-500 px-3 text-white rounded-sm focus:ring-2 hover:bg-slate-400">
                        <i className="bi bi-pencil-square"></i>Edit
                      </Button>
                      </Td>
                      <Td>
                        <Button 
                        fun={() => deleteTask(item.id)} 
                        className="bg-red-500 px-3 text-white rounded-sm focus:ring-2 hover:bg-#b10e0e-400">
                          <i className="bi bi-trash3-fill"></i>Delete
                        </Button></Td>
                    </Trow>
                  );

                })}


              </Tbody>


            </Table>
          </div>
        </Container>

      </Section>
    </MainLayout>
  );
};


export default App;