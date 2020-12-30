import DecksView from './views/DecksView.js'
import CardsView from './views/CardsView.js'
import StudyView from './views/StudyView.js'

// Render views
const decksView = DecksView(openOverlay, closeOverlay, navigateTo)
const cardsView = CardsView(openOverlay, closeOverlay, navigateTo)
const studyView = StudyView(openOverlay, closeOverlay, navigateTo)

// Router functions
async function navigateTo(url) {
    history.pushState(null, null, url)
    await route()
}

const routes = [
    { 
        path: /^\/decks$/, 
        view: decksView, 
        getParam : path => null
    },
    {
        path: /^\/decks\/(0|[1-9]\d*)$/,
        view: cardsView, 
        getParam: path => path.substring(path.search(/(0|[1-9]\d*)/))
    },
    {
        path: /^\/decks\/(0|[1-9]\d*)\/study$/,
        view: studyView,
        getParam: path => path.substring(path.search(/(0|[1-9]\d*)/), path.search(/\/study$/))
    }
]

async function route() {
    var match = routes.find(route => route.path.test(location.pathname))

    if(!match)
        match = routes[0]

    await match.view(match.getParam(location.pathname))
}

// Open and close overlay tab
function openOverlay() {
    if(window.innerWidth <= 600)
        document.querySelector('#mobile-menu').style.width = '100%';
    else
        document.querySelector('#mobile-menu').style.width = '80%';

    // Loading
    const content = document.querySelector('#mobile-menu-content')
    content.innerHTML = '<i class="fas fa-spinner w3-spin" style="color:gray;font-size:30pt;"></i>'
    content.style.opacity = '100%'
}

function closeOverlay() {
    document.querySelector('#mobile-menu').style.width = '0';
    const content = document.querySelector('#mobile-menu-content')
    content.innerHTML = ''
    content.style.opacity = '0%'
}

// Configure #list height
function setDeckListHeight() {
    var list = document.querySelector('#list');
    var top = document.querySelector('#header').offsetHeight
    top += document.querySelector('#title').offsetHeight
    top += document.querySelector('#content hr').offsetHeight
    var style = window.getComputedStyle(list);
    var marginTop = style.getPropertyValue('margin-top').substr(0,style.getPropertyValue('margin-top').length-2)
    var marginBottom = style.getPropertyValue('margin-bottom').substr(0,style.getPropertyValue('margin-bottom').length-2)
    list.style.height = (window.innerHeight - top - marginTop - marginBottom) + "px";
}

// Set up events
window.onresize = () => {
    setDeckListHeight()
    const width = document.querySelector('#mobile-menu').style.getPropertyValue('width')
    if(width != '0px' && width != '') {
        if(window.innerWidth <= 600)
            document.querySelector('#mobile-menu').style.width = '100%';
        else
            document.querySelector('#mobile-menu').style.width = '80%';
    }
}
window.onload = async () => {
    setDeckListHeight()
    await route()
}

document.body.onclick = async e => {
    // Dropdown menu
    if(e.target.parentNode.parentNode.matches('.dropdown')) {
        const dropdown = e.target.parentNode.parentNode
        if(dropdown) {
            const dropdown_content = dropdown.querySelector('.dropdown-content')
            if(dropdown_content) {
                if(dropdown_content.style.display === '') {
                    dropdown_content.style.display = 'block'
                    const close_dropdown = document.querySelector('#close-dropdown')
                    close_dropdown.dataset.dropdown = dropdown_content.id
                    close_dropdown.style.display = 'block'

                    // If overflow, turn it a dropup
                    const rect = dropdown_content.getBoundingClientRect()
                    if(rect.y+rect.height > window.innerHeight)
                        dropdown_content.style.bottom = '100%'
                }
                else {
                    const e = { target: document.querySelector('#close-dropdown') }
                    e.target.onclick(e)
                }
                
            }
        }
    }

    // NavigateTo
    if(e.target.matches('[data-link]')) {
        e.preventDefault()
        await navigateTo(e.target.href)
    }
    else if(e.target.parentNode.matches('[data-link]')) {
        e.preventDefault()
        await navigateTo(e.target.parentNode.href)
    }
}

document.querySelector('#close-overlay').onclick = closeOverlay

const close_dropdown = document.createElement('div')
close_dropdown.style.position = 'fixed'
close_dropdown.style.width = '100%'
close_dropdown.style.height = '100%'
close_dropdown.style.backgroundColor = 'transparent'
close_dropdown.style.top = '0'
close_dropdown.style.left = '0'
close_dropdown.style.zIndex = '3'
close_dropdown.style.display = 'none'
close_dropdown.id = 'close-dropdown'
close_dropdown.onclick = e => {
    if(e.target.dataset.dropdown) {
        const dropdown = document.querySelector(`#${e.target.dataset.dropdown}`)
        if(dropdown) {
            dropdown.style.display = ''
            dropdown.style.bottom = ''
            e.target.dataset.dropdown = undefined
            e.target.style.display = 'none'
        }
    }
}
document.body.appendChild(close_dropdown)