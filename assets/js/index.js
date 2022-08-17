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

  $('.parallax').parallax({
    imageSrc: './assets/image/banner.jpg',
    speed: 0.2,
  });
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

    switch (type) {
      case 0:
        dom.removeClass('base')
        dom.find('.base-name').text(service.name)
        dom.find('.base-description').text(service.description)
        dom.find('.base-image').attr('src', service.image)
        dom.find('.base-path').attr('href', service.path)
        dom.find('.base-author').text(service.author)

        $('.page').append(dom)
        break
      case 1:
        dom.removeClass('base')
        dom.find('.base-name').text(service.name)
        dom.find('.base-description').text(service.description)
        // dom.find('.base-image').attr('src', service.image)
        dom.find('.base-path').attr('href', service.path)
        // dom.find('.base-author').text(service.author)

        $('.page').append(dom)
        break
      default:
    }
  }
}

init()
