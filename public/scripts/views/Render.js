export default function(setTitleBar, listHref, setList) {
    async function loadList(param) {
        if(param) {
            listHref = listHref.replace(/:id/, param)
        }

        const list = document.querySelector('#list')
        var xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function() {
			if(this.readyState == 4) {
				if(this.status == 200) {
                    try {
                        setList(JSON.parse(this.responseText), param)
                    } catch (err) {
                        // TODO: Fix try again link
                        list.innerHTML = `<p class="w3-col s12 m12 l12 w3-center msg">Um erro ocorreu. Por favor, <a href="/decks" data-link>tente novamente</a>.</p>`
                    }
                }	
				else
                list.innerHTML = `<p class="w3-col s12 m12 l12 w3-center msg">Um erro ocorreu. Por favor, <a href="/decks" data-link>tente novamente</a>.</p>`
			}
        };

        xhttp.open('GET', listHref, true)
		xhttp.setRequestHeader('Accept', 'application/json')
		xhttp.send()
    }

    async function render(param) {
        await setTitleBar(param)
        await loadList(param)
    }

    return render
}