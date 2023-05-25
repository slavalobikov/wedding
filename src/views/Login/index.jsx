import s from './login.module.scss';
import Input from '../../components/Input';
import Button from '../../components/Button';
import AppwriteService from '../../services/AppwriteService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '../../utils/const';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('_session')) {
      navigate(ROUTES.ADMIN);
    }
  }, [navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const date = Object.fromEntries(new FormData(e.target));

    AppwriteService.createSession(date.login, date.password, navigate);
  };
  return (
    <div className={s.login}>
      <div className={s.wrapper}>
        <form onSubmit={onSubmit}>
          <Input name='login' />
          <Input name='password' type='password' />
          <Button />
        </form>
      </div>
    </div>
  );
};

export default Login;
