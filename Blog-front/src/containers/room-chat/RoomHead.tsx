type Props = {
  roomName: string
}
const RoomHead = ({ roomName }: Props) => {
  return (
    <div className="border-b-[#E9E9E9] border-b w-full h-[64px]  flex-none flex items-center justify-end pr-5">
      {roomName}
    </div>
  )
}

export default RoomHead
