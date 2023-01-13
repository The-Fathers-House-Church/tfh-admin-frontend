import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useAppDispatch } from './store/hooks';
import { updateUser } from './store/slices/user';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useAppDispatch();

	useEffect(() => {

		const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

		if (currentUser && Object.keys(currentUser).length) {
			dispatch(updateUser({ user: currentUser || null }));
		}
	}, [dispatch]);

	// const router = createBrowserRouter(routes);

  return (
    <div className="flex flex-col items-center">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
			{/* <RouterProvider router={router} /> */}

    </div>
  )
}

export default App
