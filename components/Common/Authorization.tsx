import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import LoadingSpinner from './LoadingSpinner';

interface IAuthorizationProps {
  children: ReactNode;
}

export default function Authorization(props: IAuthorizationProps) {
  const { children } = props;
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/login');

    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
