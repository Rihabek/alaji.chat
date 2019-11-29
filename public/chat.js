function getHtml (data) {
  if (typeof data === 'string') {
    const div = document.createElement('div')
    div.innerHTML = data
    data = div
  }
  return data
}

function addMessage (data) {
  const date = new Date(data.date)
  const value = `
    <div class="message">
      <div class="avatar">
        <img src="${data.avatar}">
      </div>
      <div class="content">
        <div class="pseudo">
          ${data.pseudo}
        </div>
        <div class="date">
          ${date.toLocaleDateString()}
          à
          ${date.toLocaleTimeString()}
        </div>
        ${data.message}
      </div>
    </div>
  `
  document.getElementById('messages').append(getHtml(value))
}

function addUser (data) {
  document.getElementById('users').append(getHtml(data))
}

const urlParams = new URLSearchParams(window.location.search)
const pseudo = urlParams.get('pseudo')
const avatar = urlParams.get('avatar')

const socket = io({
  query: {
    pseudo: pseudo,
    avatar: avatar
  }
})

socket.on('message', function (value) {
  addMessage(value);
})

document.querySelector('[data-avatar]').setAttribute('src', avatar)
document.querySelector('[data-pseudo]').textContent = pseudo

document.getElementById('send').addEventListener('submit', function (e) {
  e.preventDefault()
  const value = this.querySelector('input').value
  if (value) {
    // Send message
    console.log(value)
    socket.emit('message', value)
    this.querySelector('input').value = null
  }
})
