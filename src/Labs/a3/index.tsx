import Classes from "./Classes";
import ConditionalOutput from "./ConditionalOutput";
import JavaScript from "./JavaScript";
import Styles from "./Styles";
import Highlight from "./Highlight";
import PathParameters from "./routing/PathParameters";
import Add from "./Add";
import TodoList from "./todo/TodoList";

export default function Assignment3() {
  return (
    <div className="container">
      <h1>Assignment 3</h1>
      <ConditionalOutput />
      <Styles />
      <Classes />
      <PathParameters />
      <JavaScript />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <Add a={3} b={4} />
      <TodoList />
    </div>
  );
}
