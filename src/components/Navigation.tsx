import {Link} from 'react-router-dom'

export function Navigation() {
    return (
        <div>
            {/* <Link to="/">
                <h1>Preuntados</h1>
            </Link> */}
            <Link to="/:id_evaluacion/:id_usuario"></Link>
        </div>
    )
}