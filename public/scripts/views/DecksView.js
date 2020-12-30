import Render from './Render.js'

export default function(openOverlay, closeOverlay, navigateTo) {

    async function loadOverlay(path, callback) {
        const menu = document.querySelector('#mobile-menu-content')
        
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    menu.innerHTML = this.responseText
                    callback()
                }
                else // TODO: Link "tente novamente" to tryagain
                    menu.innerHTML = '<p class="w3-col s12 m12 l12 w3-center msg">Um erro ocorreu. Por favor, tente novamente</p>'
            }
        };
        xhttp.open('GET', path, true)
        xhttp.send()
    }

    async function new_deck() {
        const name = document.querySelector('#name')
    
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        closeOverlay()
                        await navigateTo('/decks')
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        };
    
        xhttp.open('POST', '/api/new-deck', true)
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify({ name: name.value }))
    }

    async function edit_deck(id) {
        const name = document.querySelector('#name')
    
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        closeOverlay()
                        await navigateTo('/decks')
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        };
    
        xhttp.open('POST', `/api/edit-deck/${id}`, true)
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify({ name: name.value }))
    }

    async function delete_deck(id) {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        closeOverlay()
                        await navigateTo('/decks')
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        };
    
        xhttp.open('DELETE', `/api/delete-deck/${id}`, true)
        xhttp.send()
    }

    async function setTitleBar(param) {
        const title = document.querySelector('#title')
        title.innerHTML = ''
        
        // <a href="/decks" data-link>Baralhos</a>
        // <div class="flex-container">
        //     <span class="flex-container" id="new-btn">
        //         <i class="icon-add"></i>
        //     </span>
        // </div>

        const decks_title = document.createElement('span')
        decks_title.innerHTML = 'Baralhos'
        title.appendChild(decks_title)

        const div = document.createElement('div')
        div.classList.add('flex-container')
        title.appendChild(div)

        const new_btn = document.createElement('span')
        new_btn.classList.add('flex-container')
        new_btn.id = 'new-btn'
        div.appendChild(new_btn)

        const icon = document.createElement('i')
        icon.classList.add('icon-add')
        new_btn.appendChild(icon)

        document.querySelector('#new-btn').onclick = async () => {
            openOverlay()
            await loadOverlay('/decks/new', () => {
                document.querySelector('#submit').onclick = new_deck
            })
        }
    }

    function setList(decks) {
        const list = document.querySelector('#list')
        list.innerHTML = ''

        // <span class="w3-col l3 m6 s12">
        //     <a class="flex-container card-btn" style="justify-content:space-between" href="/decks/${deck.id}">
        //         <div class="flex-container">
        //             <span class="icon-deck"></span>
        //             <span class="card-btn-name">${deck.name}</span>
        //         </div>

        //         <div class="dropdown">
        //             <span class="w3-hover-opacity" id="menu-btn"><i class="fas fa-ellipsis-v"></i></span>
        //             <div class="dropdown-content w3-bar-block w3-border">
        //                 <span class="w3-bar-item w3-button w3-left-align dropdown-item">Configurações</span>
        //                 <span class="w3-bar-item w3-button w3-left-align dropdown-item">Sair</span>
        //             </div>
        //         </div>
        //     </a>
        // </span>
        
        for (var i = 0; i < decks.length; i++) {
            const deck = decks[i]

            const btn = document.createElement('span')
            btn.classList.add('w3-col', 'l3', 'm6', 's12')

            const a = document.createElement('a')
            a.classList.add('flex-container', 'card-btn')
            a.style.justifyContent = 'space-between'
            a.href = `/decks/${deck.id}`
            a.dataset.link = ''
            btn.appendChild(a)

            const div = document.createElement('div')
            div.classList.add('flex-container')
            div.style.overflow = 'hidden'
            a.appendChild(div)

            const deck_icon = document.createElement('span')
            deck_icon.classList.add('icon-deck')
            deck_icon.style.fontSize = '20pt'
            div.appendChild(deck_icon)

            const name = document.createElement('span')
            name.classList.add('card-btn-name')
            name.innerHTML = deck.name
            div.appendChild(name)

            // Dropdown
            const dropdown = document.createElement('div')
            dropdown.classList.add('dropdown')
            a.appendChild(dropdown)

            const dropdown_btn = document.createElement('span')
            dropdown_btn.classList.add('w3-hover-opacity', 'dropdown-btn')
            dropdown.appendChild(dropdown_btn)
            dropdown.onclick = e => {
                e.preventDefault()
            }

            const icon = document.createElement('i')
            icon.classList.add('fas', 'fa-ellipsis-v')
            icon.style.padding = '5px'
            dropdown_btn.appendChild(icon)

            const dropdown_content = document.createElement('div')
            dropdown_content.classList.add('dropdown-content', 'w3-block', 'w3-border')
            dropdown_content.id = `deck-menu-${deck.id}`
            dropdown.appendChild(dropdown_content)

            const edit_btn = document.createElement('span')
            edit_btn.classList.add('w3-bar-item', 'w3-button', 'w3-left-align', 'dropdown-item')
            edit_btn.innerHTML = 'Editar'
            dropdown_content.appendChild(edit_btn)
            edit_btn.onclick = () => {
                openOverlay()
                loadOverlay(`/decks/edit/${deck.id}`, () => {
                    document.querySelector('#submit').onclick = async () => {
                        await edit_deck(deck.id)
                    }
                })
            }
            
            const delete_btn = document.createElement('span')
            delete_btn.classList.add('w3-bar-item', 'w3-button', 'w3-left-align', 'dropdown-item')
            delete_btn.innerHTML = 'Deletar'
            dropdown_content.appendChild(delete_btn)
            delete_btn.onclick = async () => {
                if(window.confirm(`Você tem certeza que deseja excluir o baralho ${deck.name}?`))
                    await delete_deck(deck.id)
            }
    
            list.appendChild(btn)
        }
    }

    return Render(setTitleBar, '/api/list-decks', setList)
}