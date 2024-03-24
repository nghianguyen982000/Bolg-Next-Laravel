type Props = {
  roomName: string
}
const RoomHead = ({ roomName }: Props) => {
  return (
    <div className="bg-pink-1 w-full p-2 flex-none flex justify-end">
      {roomName}
    </div>
  )
}

export default RoomHead
