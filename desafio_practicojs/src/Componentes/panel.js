import React, { Component } from 'react';

class ListaLinks extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      links: [
        { id: 1, title: 'Productos', url: ''},
        { id: 2, title: 'Categorias', url: '' },
        { id: 3, title: 'Facturas', url: '' },
        { id: 4, title: 'Ventas', url: '' }
      ]
    };
  }

  render() {
    return (
      <div>
        <h2>Lista de mantenimientos:</h2>
        <ul>
          {this.state.links.map(link => (
            <li key={link.id}>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListaLinks;








