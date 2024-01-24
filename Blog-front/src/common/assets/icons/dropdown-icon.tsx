import Icon from '@ant-design/icons'

const DropDownIcon = () => {
  const icon: () => JSX.Element = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5.31944 10.02L8.52944 13.23L10.4894 15.2C11.3194 16.03 12.6694 16.03 13.4994 15.2L18.6794 10.02C19.3594 9.34 18.8694 8.18 17.9194 8.17999L12.3094 8.17999L6.07944 8.17999C5.11944 8.17999 4.63944 9.33999 5.31944 10.02Z"
          fill="#2887F3"
        />
      </svg>
    )
  }

  return <Icon component={icon} />
}

export default DropDownIcon
