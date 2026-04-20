import { ConfigProvider } from 'antd'
import { ToastContainer } from 'react-toastify'
import { theme } from './configs/antd.config'
import useRouteElements from './useRoutesElement'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <ConfigProvider theme={theme}>
        {routeElements}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </ConfigProvider>
    </>
  )
}

export default App
