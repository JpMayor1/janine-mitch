import { PiWarningFill } from "react-icons/pi"
import { FaCircleCheck } from "react-icons/fa6"
import { Alert } from "@material-tailwind/react"
import { colors } from "@material-tailwind/react/types/generic"

type AlertProps = {
  show: boolean,
  color?: colors,
  message?: string,
  isError?: boolean,
  onClose: () => void,
}

function AlertDialog(props: AlertProps) {

  return (
    <Alert
      className="w-full my-5"
      color={props.color}
      open={props.show}
      onClose={props.onClose}>
      <div className="w-full flex flex-row justify-center items-center gap-x-3">
        {props.isError ?
          <FaCircleCheck size={20} />
          :
          <PiWarningFill size={20} />
        }
        <span>{props.message ? props.message : ''}</span>

      </div>
    </Alert>
  )
}

export default AlertDialog