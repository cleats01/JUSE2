import React from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data, status } = useSession();
  return (
    <React.Fragment>
      <div>hi</div>
    </React.Fragment>
  );
}
