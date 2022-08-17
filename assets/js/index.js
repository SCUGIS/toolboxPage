const config = {
 jsonapi: {
   base: 'https://gis.scu.edu.tw/jsonapi?id=1zTXQUPXSY1OuL5rAMX_5CKWCCWTeQtXT9LTN7R_aIT4',
   services: '&sheet=services',
   repos: '&sheet=repos',
 },
 services: [],
 repos: [],
}


const init = async () => {
  $('.parallax').parallax({
    imageSrc: './assets/image/banner.jpg',
    speed: 0.2,
  });

  const services = await $.ajax({
    url: `${config.jsonapi.base}${config.jsonapi.services}`,
    type: 'GET',
  })

  const repos = await $.ajax({
    url: `${config.jsonapi.base}${config.jsonapi.repos}`,
    type: 'GET',
  })


  config.repos = repos.rows
  config.services = services.rows

  await render(0, config.services)
}

const switchClass = (dom) => {
  if (dom.hasClass('btn-secondary')) {
    const otherDom = $('.switch-group > .btn-primary')
    otherDom.removeClass('btn-primary')
    otherDom.addClass('btn-secondary')

    dom.removeClass('btn-secondary')
    dom.addClass('btn-primary')
  }
}

$('#reposRender').click(async function () {
  switchClass($(this))
  await render(1, config.repos)
})

$('#servicesRender').click(async function () {
  switchClass($(this))
  await render(0, config.services)
})

const render = async (type, services) => {
  const base = $('.base')
  $('.page').empty()

  for (const service of services) {
    const dom = base.clone()
    const renderBtn = (text, link) => {
      const button = dom.find('.base-button').clone()
      button.attr('href', link)
      button.find('button').text(text)
      button.removeClass('base-button')
      dom.find('.btn-group').append(button)
    }

    switch (type) {
      case 0:
        dom.removeClass('base')
        dom.find('.base-name').text(service.name)
        dom.find('.base-description').text(service.description)
        dom.find('.base-image').attr('src', service.image)
        if (service.path1 && service.button1) {
          dom.find('.base-image-link').attr('href', service.path1)
          renderBtn(service.button1, service.path1)
        }

        if (service.path2 && service.button2) {
          renderBtn(service.button2, service.path2)
        }

        if (service.path3 && service.button3) {
          renderBtn(service.button3, service.path3)
        }

        if (service.path4 && service.button4) {
          renderBtn(service.button4, service.path4)
        }

        if (service.path5 && service.button5) {
          renderBtn(service.button5, service.path5)
        }
        dom.find('.base-author').text(service.author)

        $('.page').append(dom)
        break
      case 1:
        dom.removeClass('base')
        dom.find('.base-name').text(service.name)
        dom.find('.base-description').text(service.description || "")
        dom.find('.base-image').attr('src', './assets/image/github.jpg')
        dom.find('.base-author').text(service.author)

        if (service.path1 && service.button1) {
          dom.find('.base-image-link').attr('href', service.path1)
          renderBtn(service.button1, service.path1)
        }

        $('.page').append(dom)
        break
      default:
    }
  }
}

init()
