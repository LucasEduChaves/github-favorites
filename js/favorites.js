// Classe que vai conter a lógica dos dados
// como os dados serãp estruturados


export class Favorites {
  constructor (root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []

    console.log(this.entries)
  }

  // Msm resultado só mais simplificado, pois o valor não muda o dado é o msm
  // delete(user) {
  //   this.entries = this.entries
  //   .filter(entry => entry.login !== user.login)
  // }

  delete(user) {
    const filteredEntries = this.entries
    .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
  }
}

// Classe que vai criar a vizualização e eventos do HTML

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }
  
  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()
      
      row.querySelector('.user img').src =`https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent  = user.name
      row.querySelector('.user span').textContent  = user.login
      row.querySelector('.repositories').textContent  = user.public_repos
      row.querySelector('.followers').textContent  = user.followers

      // Usar "onclick" somente quando não tiver varios eventos.
      // Se tiver varios eventos ".addEventListener"
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow () {

    const tr = document.createElement('tr')

    tr.innerHTML =  `
    <td class="user">
      <img src="https://github.com/LucasEduChaves.png" 
      alt="imagem de Lucas Eduardo Chaves">
      <a href="https://github.com/LucasEduChaves" target="_blank">
      <p>Lucas Eduardo Chaves</p>
      <span>LucasEduChaves</span>
    </a>
    </td>

    <td class="repositories">
      13
    </td>
    
    <td class="followers">
      5
    </td>
    
    <td>
      <button class="remove">&times;</button>
    </td>
    `

    return tr
  }

  removeAllTr(){  

      this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
      })
  }
}