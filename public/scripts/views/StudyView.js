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
                <span style="white-space:nowrap;text-overflow:ellipsis;overflow: hidden">Estudando ${deck.name}</span>
                <div class="flex-container">
                    <a class="flex-container" href="/decks/${deck.id}" data-link style="color:gray">
                        <i class="icon-card"></i>
                    </a>
                    <a class="flex-container" href="/decks" data-link style="color:gray">
                        <i class="icon-deck"></i>
                    </a>
                </div>
            `
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

        // list.innerHTML = `
        //     <div class="w3-card-4 w3-center">
                
        //         <div class="w3-container">
        //             <p class="w3-xxlarge">Header</p>
        //         </div>
                
        //         <footer class="w3-container" style="padding-bottom:15px">
        //             <div class="w3-row">
        //                 <div class="w3-col l4 w3-btn w3-red">
        //                     Difícil
        //                 </div>
        //                 <div class="w3-col l4 w3-btn w3-blue">
        //                     Normal
        //                 </div>
        //                 <div class="w3-col l4 w3-btn w3-green">
        //                     Fácil
        //                 </div>
        //             </div>
        //         </footer>
        //     </div>
        // `
        
        for (let i = 0; i < cards.length-1; i++) {
            const card = cards[i];
            const front_div_card = document.createElement('div')
            front_div_card.classList.add('w3-card-4', 'w3-center')
            front_div_card.id = `card-front-${i}`
            front_div_card.style.display = 'none'
            list.appendChild(front_div_card)

            const front_div_content = document.createElement('div')
            front_div_content.classList.add('w3-container')
            front_div_card.appendChild(front_div_content)

            const front_text = document.createElement('p')
            front_text.classList.add('w3-xxlarge')
            front_text.innerHTML = card.front
            front_div_content.appendChild(front_text)

            const front_footer = document.createElement('footer')
            front_footer.classList.add('w3-container')
            front_footer.style.paddingBottom = '15px'
            front_div_card.appendChild(front_footer)

            const btns = document.createElement('div')
            btns.classList.add('w3-row')
            front_footer.appendChild(btns)

            const front_btn_reveal = document.createElement('div')
            front_btn_reveal.classList.add('w3-col', 'l12', 'w3-btn', 'w3-blue')
            front_btn_reveal.innerHTML = 'Mostrar Resposta'
            btns.appendChild(front_btn_reveal)

            front_btn_reveal.onclick = () => {
                document.querySelector(`#card-front-${i}`).style.display = 'none'
                document.querySelector(`#card-back-${i}`).style.display = 'block'
            }

            // Back
            const back_div_card = document.createElement('div')
            back_div_card.classList.add('w3-card-4', 'w3-center')
            back_div_card.id = `card-back-${i}`
            back_div_card.style.display = 'none'
            list.appendChild(back_div_card)

            const back_div_content = document.createElement('div')
            back_div_content.classList.add('w3-container')
            back_div_card.appendChild(back_div_content)

            const back_text = document.createElement('p')
            back_text.classList.add('w3-xxlarge')
            back_text.innerHTML = card.back
            back_div_content.appendChild(back_text)

            const back_footer = document.createElement('footer')
            back_footer.classList.add('w3-container')
            back_footer.style.paddingBottom = '15px'
            back_div_card.appendChild(back_footer)

            const back_btns = document.createElement('div')
            back_btns.classList.add('w3-row')
            back_footer.appendChild(back_btns)

            const btn_hard = document.createElement('div')
            btn_hard.classList.add('w3-col', 'l4', 'w3-btn', 'w3-red')
            btn_hard.innerHTML = 'Difícil'
            back_btns.appendChild(btn_hard)
            btn_hard.onclick = () => {
                document.querySelector(`#card-back-${i}`).style.display = 'none'
                document.querySelector(`#card-front-${i+1}`).style.display = 'block'
            }

            const btn_normal = document.createElement('div')
            btn_normal.classList.add('w3-col', 'l4', 'w3-btn', 'w3-blue')
            btn_normal.innerHTML = 'Normal'
            back_btns.appendChild(btn_normal)
            btn_normal.onclick = btn_hard.onclick

            const btn_easy = document.createElement('div')
            btn_easy.classList.add('w3-col', 'l4', 'w3-btn', 'w3-green')
            btn_easy.innerHTML = 'Fácil'
            back_btns.appendChild(btn_easy)
            btn_easy.onclick = btn_hard.onclick

            if(i == 0)
                front_div_card.style.display = 'block'
        }

        const i = cards.length-1
        const card = cards[i];
        const front_div_card = document.createElement('div')
        front_div_card.classList.add('w3-card-4', 'w3-center')
        front_div_card.id = `card-front-${i}`
        front_div_card.style.display = 'none'
        list.appendChild(front_div_card)

        const front_div_content = document.createElement('div')
        front_div_content.classList.add('w3-container')
        front_div_card.appendChild(front_div_content)

        const front_text = document.createElement('p')
        front_text.classList.add('w3-xxlarge')
        front_text.innerHTML = card.front
        front_div_content.appendChild(front_text)

        const front_footer = document.createElement('footer')
        front_footer.classList.add('w3-container')
        front_footer.style.paddingBottom = '15px'
        front_div_card.appendChild(front_footer)

        const btns = document.createElement('div')
        btns.classList.add('w3-row')
        front_footer.appendChild(btns)

        const front_btn_reveal = document.createElement('div')
        front_btn_reveal.classList.add('w3-col', 'l12', 'w3-btn', 'w3-blue')
        front_btn_reveal.innerHTML = 'Mostrar Resposta'
        btns.appendChild(front_btn_reveal)

        front_btn_reveal.onclick = () => {
            document.querySelector(`#card-front-${i}`).style.display = 'none'
            document.querySelector(`#card-back-${i}`).style.display = 'block'
        }

        // Back
        const back_div_card = document.createElement('div')
        back_div_card.classList.add('w3-card-4', 'w3-center')
        back_div_card.id = `card-back-${i}`
        back_div_card.style.display = 'none'
        list.appendChild(back_div_card)

        const back_div_content = document.createElement('div')
        back_div_content.classList.add('w3-container')
        back_div_card.appendChild(back_div_content)

        const back_text = document.createElement('p')
        back_text.classList.add('w3-xxlarge')
        back_text.innerHTML = card.back
        back_div_content.appendChild(back_text)

        const back_footer = document.createElement('footer')
        back_footer.classList.add('w3-container')
        back_footer.style.paddingBottom = '15px'
        back_div_card.appendChild(back_footer)

        const back_btns = document.createElement('div')
        back_btns.classList.add('w3-row')
        back_footer.appendChild(back_btns)

        const btn_hard = document.createElement('div')
        btn_hard.classList.add('w3-col', 'l4', 'w3-btn', 'w3-red')
        btn_hard.innerHTML = 'Difícil'
        back_btns.appendChild(btn_hard)
        btn_hard.onclick = () => {
            document.querySelector(`#card-back-${i}`).style.display = 'none'
            window.alert('Parabéns! Você concluiu o seu estudo.')
            navigateTo(`/decks/${deck_id}`)
        }

        const btn_normal = document.createElement('div')
        btn_normal.classList.add('w3-col', 'l4', 'w3-btn', 'w3-blue')
        btn_normal.innerHTML = 'Normal'
        back_btns.appendChild(btn_normal)
        btn_normal.onclick = btn_hard.onclick

        const btn_easy = document.createElement('div')
        btn_easy.classList.add('w3-col', 'l4', 'w3-btn', 'w3-green')
        btn_easy.innerHTML = 'Fácil'
        back_btns.appendChild(btn_easy)
        btn_easy.onclick = btn_hard.onclick

        if(i == 0)
            front_div_card.style.display = 'block'
    }

    return Render(setTitleBar, '/api/decks/:id/study', setList)
}