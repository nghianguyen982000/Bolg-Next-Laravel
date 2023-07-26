import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import BackgroundAuth from '../../Assets/img/backgroundAuth.jpg';
import imgRegister from '../../Assets/img/register.png';

interface RegisterProps {
  user_name: string;
  name_account: string;
  email: string;
  password: string;
  password_confirmation: string;
}
const schemaRegister = yup.object().shape({
  user_name: yup.string().required('Please fill in this field'),
  name_account: yup.string().required('Please fill in this field'),
  email: yup.string().email().required('Please fill in this field'),
  password: yup.string().required('Please fill in this field').min(6),
  password_confirmation: yup
    .string()
    .required('Please fill in this field')
    .min(6),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: yupResolver(schemaRegister),
  });
  const onSubmit = (data: RegisterProps) => {
    // eslint-disable-next-line
    console.log(data);
  };
  return (
    <div
      className="bg-top bg-cover bg-no-repeat h-screen"
      style={{ backgroundImage: `url(${BackgroundAuth})` }}
    >
      <div className="bg-white h-[550px] w-[900px] absolute left-2/4 top-2/4 translate-y-[-50%] translate-x-[-50%] flex rounded-[10px] shadow-[0_2px_5px_rgba(0,0,0,0.5)] p-[50px]">
        <div className="flex-[50%]">
          <div className="text-[35px] font-bold mb-[15px]">REGISTER</div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="h-[40px] outline-transparent "
              placeholder="User name"
              {...register('user_name')}
            />
            <hr className="mb-[15px]" />
            {errors.user_name && (
              <p className="text-[red] text-[12px]">
                {errors.user_name.message}
              </p>
            )}
            <input
              type="text"
              className="h-[40px] outline-transparent "
              placeholder="Name account"
              {...register('name_account')}
            />
            <hr className="mb-[15px]" />
            {errors.name_account && (
              <p className="text-[red] text-[12px]">
                {errors.name_account.message}
              </p>
            )}
            <input
              type="email"
              className="h-[40px] outline-transparent "
              placeholder="Email"
              {...register('email')}
            />
            <hr className="mb-[15px]" />
            {errors.email && (
              <p className="text-[red] text-[12px]">{errors.email.message}</p>
            )}
            <input
              type="password"
              className="h-[40px] outline-transparent"
              placeholder="Password"
              {...register('password')}
            />
            <hr className="mb-[15px]" />
            {errors.password && (
              <p className="text-[red] text-[12px]">
                {errors.password.message}
              </p>
            )}
            <input
              type="password"
              className="h-[40px] outline-transparent"
              placeholder="Password"
              {...register('password_confirmation')}
            />
            <hr className="mb-[15px]" />
            {errors.password_confirmation && (
              <p className="text-[red] text-[12px]">
                {errors.password_confirmation.message}
              </p>
            )}
            <button
              type="submit"
              className="h-[35px] w-[100px] bg-[#1890ff] text-[#fff] "
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex-[50%] flex flex-col justify-center items-center">
          <img className="w-[80%]" src={imgRegister} alt="img error" />
          <div className="">
            <Link to="/login" className="font-bold">
              I signed up with an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
