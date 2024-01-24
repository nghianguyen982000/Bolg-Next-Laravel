import Icon from '@ant-design/icons'

const PlusButtonIcon = () => {
  const icon: () => JSX.Element = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M8.40723 12.5H16.589"
          stroke="#439EF2"
          strokeWidth="1.84091"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 16.592V8.41022"
          stroke="#439EF2"
          strokeWidth="1.84091"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.4296 22.7284H15.566C20.6796 22.7284 22.7251 20.683 22.7251 15.5693V9.43295C22.7251 4.31932 20.6796 2.27386 15.566 2.27386H9.4296C4.31596 2.27386 2.27051 4.31932 2.27051 9.43295V15.5693C2.27051 20.683 4.31596 22.7284 9.4296 22.7284Z"
          stroke="#439EF2"
          strokeWidth="1.84091"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return <Icon component={icon} />
}

export default PlusButtonIcon
