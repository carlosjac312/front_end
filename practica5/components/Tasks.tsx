import { Crear } from "./Crear.tsx";
import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { Estado, Tarea } from "../types.ts";
import { Actualizar } from "./Actualizar.tsx";

function onUpdate () {

}

export const Tasks: FunctionComponent = () => {
  const tasks = useSignal<Tarea[]>([]);

  const [show, createShow] = useState<boolean>(false);
  const [upshow, updateShow] = useState<boolean>(false);
  const [upTask, updateTask] = useState<Tarea>({name:"", state:Estado.TO_DO});

  const tasksTodo = tasks.value.filter((e) => e.state === Estado.TO_DO);
  const tasksinprog = tasks.value.filter((e) => e.state === Estado.In_progress);
  const tasksinrev = tasks.value.filter((e) => e.state === Estado.In_review);
  const tasksdone = tasks.value.filter((e) => e.state === Estado.Done);

  return (
    <div class="container">
      {show === true && <Crear onClose={() => createShow(false)} tasks={tasks} />}
      {upshow === true && <Actualizar onClose={() => updateShow(false)} oldTask={upTask} tasks={tasks} />}

      <button class="crearB" onClick={() => createShow(true)}>Crear</button>
      <div class="columncontainer">
        <div class="taskcont">
          {tasksTodo.map((e) => (<><div class="task" onClick={()=> {updateTask(e); updateShow(true)}}>{e.name}</div><hr/></>))}
        </div>
        <div class="taskcont">
          {tasksinprog.map((e) => (<><div class="task" onClick={()=> {updateTask(e); updateShow(true)}}>{e.name}</div><hr/></>))}
        </div>
        <div class="taskcont">
          {tasksinrev.map((e) => (<><div class="task" onClick={()=> {updateTask(e); updateShow(true)}}>{e.name}</div><hr/></>))}
        </div>
        <div class="taskcont">
          {tasksdone.map((e) => (<><div class="task" onClick={()=> {updateTask(e); updateShow(true)}}>{e.name}</div><hr/></>))}
        </div>
      </div>
    </div>
  );
};
