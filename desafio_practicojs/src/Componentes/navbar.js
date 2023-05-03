import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/productos" className="site-title">
        Desafio Practico
      </Link>
      <ul>
        <CustomLink to="/usuarios">Usuarios</CustomLink>
        <CustomLink to="/clientes">Clientes</CustomLink>
        <CustomLink to="/categorias">Categorias</CustomLink>
        <CustomLink to="/productos">Productos</CustomLink>
        <CustomLink to="/ventas">Ventas</CustomLink>
        <CustomLink to="/facturas">Facturas</CustomLink>
        <CustomLink to="/Roles">Roles</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)

  return (
        <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>

    

  )
}
