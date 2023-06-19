import { useEffect } from 'react';
import { useRouter } from 'next/router';

const JavaScriptProject = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('../Model');
  }, []);

  return null;
};

export default JavaScriptProject;