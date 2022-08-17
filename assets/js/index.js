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

  await render(0, config.services)
}

$('#reposRender').click(async () => {
  await render(1, config.repos)
})

$('#servicesRender').click(async () => {
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
