import { useState } from 'react';

import { Button, Input } from './components';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Input type="input" />
      <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </>
  );
};
