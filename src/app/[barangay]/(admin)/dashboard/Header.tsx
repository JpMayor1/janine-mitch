'use client'

import { Carousel } from "@material-tailwind/react"

type DashboardHeaderProps = {

}

function DashboardHeader(props: DashboardHeaderProps) {
  return (
    <Carousel
      loop
      autoplay
      autoplayDelay={5000}
      className="rounded-xl w-full h-80 shadow-md"
      transition={{ type: "tween", duration: 1.5 }}
    >
      <div className="w-full h-full rounded-xl bg-white">
        <div>Hello World</div>
      </div>
      <div className="w-full h-full rounded-xl bg-white">
        <div>Hello World</div>
      </div>
      <div className="w-full h-full rounded-xl bg-white">
        <div>Hello World</div>
      </div>
    </Carousel>
  )
}

export default DashboardHeader