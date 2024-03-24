import Image from "next/image"
import Link from "next/link"

function Certificates({ params }: any) {
  return (
    <div className="w-full h-full row center gap-x-5">
      <Link
        className="w-auto p-5 rounded-xl bg-red-400 text-white"
        href={`/${params.barangay}/certificates/ID`}
      >
        <Image
          alt="indigency"
          width={90}
          height={110}
          src={'/public/indigency.png'}
        />
        Barangay ID
      </Link>

      <Link
        className="w-auto p-5 rounded-xl bg-red-400 text-white"
        href={`/${params.barangay}/certificates/indigency`}
      >
        <Image
          alt="indigency"
          width={90}
          height={110}
          src={'/public/indigency.png'}
        />
        Barangay Indigency
      </Link>

      <Link
        className="w-auto p-5 rounded-xl bg-red-400 text-white"
        href={`/${params.barangay}/certificates/clearance`}
      >
        <Image
          alt="clearance"
          width={90}
          height={110}
          src={'/public/clearance.png'}
        />
        Barangay Clearance
      </Link>
      <Link
        className="w-auto p-5 rounded-xl bg-red-400 text-white"
        href={`/${params.barangay}/certificates/request`}
      >
        <Image
          alt="request"
          width={90}
          height={110}
          src={'/public/request.png'}
        />
        Barangay Request
      </Link>
    </div>
  )
}

export default Certificates