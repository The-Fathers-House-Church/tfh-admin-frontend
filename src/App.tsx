import { useAppDispatch } from './store/hooks';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { updateUser } from './store/slices/user';
import { useEffect } from 'react';
import { routes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // toast css
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; //Rich text editor css

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (currentUser && Object.keys(currentUser).length) {
      dispatch(updateUser({ user: currentUser || null }));
    }
  }, [dispatch]);

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      {/* Toast is here so that it is not interrupted by the routing */}
      <ToastContainer
        style={{
          fontSize: 16,
          zIndex: 30,
        }}
        theme='colored'
        autoClose={5000}
        position='top-right'
        hideProgressBar={true}
        closeOnClick={true}
      />
    </>
  );
}

export default App;
