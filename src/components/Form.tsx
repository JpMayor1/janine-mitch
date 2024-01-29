'use client'

import { Input } from "@material-tailwind/react"

type FormProps = {
  inputs: Array<any>
}

function Form(props: FormProps) {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black/80">
      <div className="w-full xl:w-1/4 p-5 rounded-md bg-white">
        {props.inputs.map((v, i) => {
          if (typeof v === 'string') {
            return (
              <div key={i} className="w-full my-3">
                <Input
                  label={v}
                  placeholder={v}
                />
              </div>
            )
          }
          else if (v instanceof Array) {
            // v.map()
          }
        })}
      </div>
    </div>
  )
}

export default Form