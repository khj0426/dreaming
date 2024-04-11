'use client';
import { useAxios } from './hooks/useAxios';
import LoginPage from './login/page';
import MainPage from './main/page';
export default function Home() {
  const { error } = useAxios('/api/user', 'get');
  if (error) {
    return <LoginPage />;
  }
  return <MainPage />;
}
