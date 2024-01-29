'use client'

type TableProps = {
  head?: Array<string>,
  data?: Array<Object>
}

function Table(props: TableProps) {
  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        {props.head ?
          props.head.map((item) => (
            <th key={item}>
              <span className="text-xs">{item}</span>
            </th>
          ))
          :
          <></>
        }
      </thead>
      <tbody></tbody>
    </table>
  )
}

export default Table