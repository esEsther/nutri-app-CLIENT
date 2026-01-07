import { Routes, Route} from 'react-router-dom'
import { HomePage } from '../Components/HomePage'
import { ArticuloDetalle } from '../Components/ArticuloDetalle'
import { LoginPage } from '../Components/LoginPage'
import { Proteccion } from '../Components/PublicProtection'
import { AuthLayout } from './AuthLayout'
import { RegisterPage } from '../Components/RegisterPage'
import { MostrarArticulos } from '../Components/MostrarArticulos'
import { BuscarArticulo } from '../pages/UserBuscar'
import { Favoritos } from '../pages/UserFavoritos'
import { AdminCrear } from '../pages/AdminCrear'
import { AdminEditar } from '../pages/AdminEditar'

export const AppRoutes = () => {
    return (
        <Routes>
      <Route path="/" element={<AuthLayout />}>
      <Route path='inicio' element={<HomePage />} />
      <Route path="articulo/:id" element={<ArticuloDetalle />} />
       </Route>

       
      
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />}/>
        <Route path="register" element={<RegisterPage />}/>
      </Route>

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