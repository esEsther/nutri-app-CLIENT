import { Routes, Route} from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ArticuloDetalle } from '../Components/ArticuloDetalle'
import { Proteccion } from '../Components/PublicProtection'
import { AuthLayout } from './AuthLayout'
import { RegisterPage } from '../pages/RegisterPage'
import { BuscarArticulo } from '../pages/UserBuscar'
import { Favoritos } from '../pages/UserFavoritos'
import { AdminCrear } from '../pages/AdminCrear'
import { AdminEditar } from '../pages/AdminEditar'
import { LoginPage } from '../pages/LoginPage'
import { AdminBuscar } from '../pages/AdminBuscar'
import { AdminEditarUsuario } from '../pages/AdminEditarUsuario'
import { UserBuscarRecetas } from '../pages/UserBuscarRecetas'
import { PruebaTraducir } from '../pages/PruebaTraducir'
import { AdminCrearUsuario } from '../pages/AdminCrearUsuario'
import { RecetaDetalle } from '../pages/RecetaDetalle'
import { RecetasFavoritas } from '../pages/RecetasFavoritas'

export const AppRoutes = () => {
    return (
        <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/articulo/:id" element={<ArticuloDetalle />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/detalleReceta/:id" element={<RecetaDetalle/>}/>
      

      <Route path="/user" element={<Proteccion>
                                      <AuthLayout />
                                    </Proteccion>
                                  }>
        <Route path="buscarArticulo" element={<BuscarArticulo/>}/>
        <Route path="favoritos"  element={ <Favoritos/>  } />
        <Route path="buscarRecetas" element={ <UserBuscarRecetas/> }/>
        <Route path="recetasFavoritas" element={ <RecetasFavoritas/> }/>
        

        {/* <Route path="pruebaTraducir" element={ <PruebaTraducir/> }/> */}


      </Route> 

      <Route path="/admin" element={<Proteccion>
                                      <AuthLayout />
                                    </Proteccion>
                                  }>
        <Route path="todosLosArticulos" element={<BuscarArticulo/>}/>
        <Route path="anadirArticulo"  element={ <AdminCrear/>  } />
        <Route path="editarArticulo/:id"  element={ <AdminEditar/>  } />
        <Route path="todosLosUsuarios" element={<AdminBuscar/>} />
        <Route path="editarUsuario/:id" element={<AdminEditarUsuario/>} />
        <Route path="crearUsuario" element={<AdminCrearUsuario/>} />
¡
      </Route> 


    </Routes>
        
     

    )
}