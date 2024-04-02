import Link from "next/link";

function Certificates({ params }: any) {
    return (
        <div className="w-full h-full row center gap-3">
            <Link
                className="w-auto py-5 px-10 rounded-xl bg-red-400 text-white"
                href={`/${params.barangay}/certificates/ID`}
            >
                Barangay ID
            </Link>

            <Link
                className="w-auto py-5 px-10 rounded-xl bg-red-400 text-white"
                href={`/${params.barangay}/certificates/indigency`}
            >
                Barangay Indigency
            </Link>

            <Link
                className="w-auto py-5 px-10 rounded-xl bg-red-400 text-white"
                href={`/${params.barangay}/certificates/clearance`}
            >
                Barangay Clearance
            </Link>
            <Link
                className="w-auto py-5 px-10 rounded-xl bg-red-400 text-white"
                href={`/${params.barangay}/certificates/request`}
            >
                Barangay Request
            </Link>
        </div>
    );
}

export default Certificates;
