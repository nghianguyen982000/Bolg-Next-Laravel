import Icon from '@ant-design/icons'

const EditIcon = () => {
  const icon: () => JSX.Element = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M11.0504 2.99999L4.20878 10.2417C3.95045 10.5167 3.70045 11.0583 3.65045 11.4333L3.34211 14.1333C3.23378 15.1083 3.93378 15.775 4.90045 15.6083L7.58378 15.15C7.95878 15.0833 8.48378 14.8083 8.74211 14.525L15.5838 7.28332C16.7671 6.03332 17.3004 4.60832 15.4588 2.86665C13.6254 1.14165 12.2338 1.74999 11.0504 2.99999Z"
          stroke="#1890FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.9082 4.20834C10.2665 6.50834 12.1332 8.26668 14.4499 8.50001"
          stroke="#1890FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 18.3333H17.5"
          stroke="#1890FF"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return <Icon component={icon} />
}

export default EditIcon
