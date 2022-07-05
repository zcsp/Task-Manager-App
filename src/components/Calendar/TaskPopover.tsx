import { Popover, ArrowContainer } from 'react-tiny-popover'
import TaskForm from '../TaskForm';
import './TaskPopover.scss';

const TaskPopover = ({ event, children }: any) => {

  const closePopover = () => {
    event.set({ editing: false });
  }

  const eventTask = event.attributes.task;

  return (
    <Popover
      isOpen={event.isEditing()}
      onClickOutside={closePopover}
      positions={['top', 'right', 'left', 'bottom']}
      content={
        ({ position, childRect, popoverRect }: any) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="white"
            arrowSize={10}
            className="popover-arrow-container"
            arrowClassName='popover-arrow'
          >
            <div className="task-popover">
              <TaskForm task={eventTask} afterSubmit={event.attributes.afterSubmit} />
            </div>
          </ArrowContainer>
        )
      }
    >
      <div {...children.props} />
    </Popover>
  )
}

export default TaskPopover;