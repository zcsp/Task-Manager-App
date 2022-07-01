import { Popover, ArrowContainer } from 'react-tiny-popover'
import './TaskPopover.scss';

const TaskPopover = (props: any) => {

  console.log(props)
  console.log(props.event.isEditing())

  const closePopover = () => {
    props.event.set({ editing: false });
  }

  return (
    <Popover
      isOpen={props.event.isEditing()}
      onClickOutside={closePopover}
      positions={['top', 'right', 'left', 'bottom']}
      content={
        ({ position, childRect, popoverRect }: any) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={'white'}
            arrowSize={10}
            className='popover-arrow-container'
            arrowClassName='popover-arrow'
          >
            <div className="task-popover">
              Hi! I'm popover content.
            </div>
          </ArrowContainer>
        )
      }
    >
      <div {...props.children.props} />
    </Popover>
  )
}

export default TaskPopover;