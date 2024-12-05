import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import '@src/scss/app.scss';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
