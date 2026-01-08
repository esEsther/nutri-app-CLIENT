import { Routes, Route} from 'react-router-dom'
import { HomePage } from '../Components/HomePage'
import { ArticuloDetalle } from '../Components/ArticuloDetalle'
import { Proteccion } from '../Components/PublicProtection'
import { AuthLayout } from './AuthLayout'
import { RegisterPage } from '../pages/RegisterPage'
import { BuscarArticulo } from '../pages/UserBuscar'
import { Favoritos } from '../pages/UserFavoritos'
import { AdminCrear } from '../pages/AdminCrear'
import { AdminEditar } from '../pages/AdminEditar'
import { LoginPage } from '../pages/LoginPage'

export const AppRoutes = () => {
    return (
        <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/articulo/:id" element={<ArticuloDetalle />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      

      <Route path="/user" element={<Proteccion>
                                      <AuthLayout />
                                    </Proteccion>
                                  }>
        <Route path="buscarArticulo" element={<BuscarArticulo/>}/>
        <Route path="favoritos"  element={ <Favoritos/>  } />
      </Route> 

      <Route path="/admin" element={<Proteccion>
                                      <AuthLayout />
                                    </Proteccion>
                                  }>
        <Route path="todosLosArticulos" element={<BuscarArticulo/>}/>
        <Route path="anadirArticulo"  element={ <AdminCrear/>  } />
        <Route path="editarArticulo/:id"  element={ <AdminEditar/>  } />

      </Route> 


    </Routes>
        
     

    )
}