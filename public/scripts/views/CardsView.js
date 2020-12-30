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
        }
        xhttp.open('GET', path, true)
        xhttp.send()
    }

    async function new_card(deck_id) {
        const front = document.querySelector('#front')
        const back = document.querySelector('#back')
    
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        closeOverlay()
                        await navigateTo(`/decks/${deck_id}`)
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        }
    
        xhttp.open('POST', `/api/decks/${deck_id}/new-card`, true)
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify({ front: front.value, back: back.value }))
    }

    async function edit_card(deck_id, id) {
        const front = document.querySelector('#front')
        const back = document.querySelector('#back')
    
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        closeOverlay()
                        await navigateTo(`/decks/${deck_id}`)
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        }
    
        xhttp.open('POST', `/api/decks/${deck_id}/edit-card/${id}`, true)
        xhttp.setRequestHeader('Content-Type', 'application/json')
        xhttp.send(JSON.stringify({ front: front.value, back: back.value }))
    }

    async function delete_deck(deck_id, id) {
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        closeOverlay()
                        await navigateTo(`/decks/${deck_id}`)
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        }
    
        xhttp.open('DELETE', `/api/decks/${deck_id}/delete-card/${id}`, true)
        xhttp.send()
    }

    async function setTitleBar(deck_id) {
        function setDeckInfo(deck) {
            const title = document.querySelector('#title')
            title.innerHTML = `
                <span style="white-space:nowrap;text-overflow:ellipsis;overflow: hidden">${deck.name}</span>
                <div class="flex-container">
                    <a class="flex-container" href="/decks/${deck.id}/study" data-link style="color:gray">
                        <i class="icon-study"></i>
                    </a>
                    <a class="flex-container" href="/decks" data-link style="color:gray">
                        <i class="icon-deck"></i>
                    </a>
                    <span class="flex-container" id="new-btn">
                        <i class="icon-add"></i>
                    </span>
                </div>
            `
            document.querySelector('#new-btn').onclick = async () => {
                openOverlay()
                await loadOverlay('/cards/new', () => {
                    document.querySelector('#submit').onclick = () => {
                        new_card(deck_id)
                    }
                })
            }
        }

        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = async function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    try {
                        // closeOverlay() TODO: ver se precisa retirar
                        setDeckInfo(JSON.parse(this.responseText))
                    } catch (error) {
                    }
                }	
                else
                    window.alert("Return status = " + this.status)
            }	
        }

        xhttp.open('GET', `/api/decks/${deck_id}`, true)
        xhttp.send()
    }

    function setList(cards, deck_id) {
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
        
        for (var i = 0; i < cards.length; i++) {
            const card = cards[i]

            const btn = document.createElement('span')
            btn.classList.add('w3-col', 'l3', 'm6', 's12')

            const span = document.createElement('span')
            span.classList.add('flex-container', 'card-btn')
            span.style.justifyContent = 'space-between'
            btn.appendChild(span)
            span.onclick = async e => {
                if(e.target.tagName !== 'I' && !e.target.matches('.dropdown-item')) {
                    openOverlay()
                    await loadOverlay(`/decks/${deck_id}/cards/edit`, () => { // TODO: Check link
                        document.querySelector('#submit').onclick = async () => {
                            await edit_card(deck_id, card.id)
                        }
                    })   
                }
            }


            const div = document.createElement('div')
            div.classList.add('flex-container')
            div.style.overflow = 'hidden'
            span.appendChild(div)

            const card_icon = document.createElement('span')
            card_icon.classList.add('icon-card')
            card_icon.style.fontSize = '20pt'
            div.appendChild(card_icon)

            const name = document.createElement('span')
            name.classList.add('card-btn-name')
            name.innerHTML = card.front
            div.appendChild(name)

            // Dropdown
            const dropdown = document.createElement('div')
            dropdown.classList.add('dropdown')
            span.appendChild(dropdown)

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
            dropdown_content.id = `card-menu-${card.id}`
            dropdown.appendChild(dropdown_content)

            const edit_btn = document.createElement('span')
            edit_btn.classList.add('w3-bar-item', 'w3-button', 'w3-left-align', 'dropdown-item')
            edit_btn.innerHTML = 'Editar'
            dropdown_content.appendChild(edit_btn)

            edit_btn.onclick = async () => {
                openOverlay()
            
                await loadOverlay(`/decks/${deck_id}/cards/edit`, () => { // TODO: Check link
                    document.querySelector('#submit').onclick = async () => {
                        await edit_card(deck_id, card.id)
                    }
                })
            }
            
            const delete_btn = document.createElement('span')
            delete_btn.classList.add('w3-bar-item', 'w3-button', 'w3-left-align', 'dropdown-item')
            delete_btn.innerHTML = 'Deletar'
            dropdown_content.appendChild(delete_btn)
            delete_btn.onclick = async () => {
                if(window.confirm(`Você tem certeza que deseja excluir o cartão ${card.front}?`))
                    await delete_deck(deck_id, card.id)
            }
    
            list.appendChild(btn)
        }
    }

    return Render(setTitleBar, '/api/decks/:id/list-cards', setList)
}