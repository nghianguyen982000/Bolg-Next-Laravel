type PageTitleProps = {
  title: string
  className?: string
}

const PageListTitle = ({ title, className }: PageTitleProps) => {
  return (
    <div className={className}>
      <div className="bg-green-1 w-[5px] h-[43px] mr-[17px]"></div>
      <div className="text-[24px] lg:text-[30px] font-normal">{title}</div>
    </div>
  )
}

export default PageListTitle
